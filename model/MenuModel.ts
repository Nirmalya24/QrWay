import Mongoose = require("mongoose");
import { DataAccess } from '../DataAccess';
import { IMenuModel } from '../interfaces/IMenuModel';
import { ItemModel } from "./ItemModel";
import { Console } from "console";
import { rmSync } from "fs";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class MenuModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                menuID: String,
                restaurantID: String,
                menuName: String,
                menuItems: [String],
                menuSections: Object,
                menuDescription: String,
                menuStartTime: string,
                menuEndTime: string

            }, { collection: 'Menus' }
        );
    }
    public createModel(): void {
        this.model = mongooseConnection.model<IMenuModel>("Menus", this.schema);
    }

    public error_message(err: any, response: any) {
        if (err) {
            console.log("[Menu Model] " + err);
            response.json({ "message": "error", "data": err });
        } else {
            console.log("[Menu Model] Success");
        }
    }

    /**
     * Queries the database for all menus that match the filter.
     * @param response 
     * @param filter must contain the restaurantId
     */

    public async retrieveAllMenus(response: any, filter: Object): Promise<any> {
        try {
            console.log("[Menu Model] Retrieving all Menus ...");
            const query = this.model.find(filter);
            const menuArray = await query.exec();
            return menuArray;
        } catch (err) {
            throw this.error_message(err, response);
        }
    }


    /**
     * Queries the database for a menu and retrieves the menu sections and the items in each section.
     * @param response
     * @param filter must contain the restaurantId and menuId
     * @returns
     * - If the menu is found, returns the menu.
     * - If the menu is not found, returns a message saying so.
     * - If there is an error, returns the error. 
     * */
    public retrieveMenuSections(response: any, filter: Object): any {
        console.log("[Menu Model] Retrieving all sections ...");
        console.log(filter);
        var query = this.model.findOne(filter, { "menuSections": 1, _id: 0 });
        query.exec((err, menuArray) => {
            if (menuArray == null)
                response.send("No menu found with that ID");
            else
                response.json(menuArray);

            this.error_message(err, response);
        });
    }

    public async createMenu(response: any, newMenu: object): Promise<any> {
        try {
            console.log("[Menu Model] Creating menu ...");
            const menu = await this.model.create(newMenu);
            console.log("[Menu Model] Success!");
            response.json(menu);
        } catch (err) {
            this.error_message(err, response);
        }
    }


    /**
     * Adds a menu section to a specific menu of a restaurant.
     * @param response - the response object
     * @param addMenu - object containing the restaurantId and menuId
     * @param sectionName - string of the new menu section
     */
    public addMenuSection(response: any, addMenu: object, sectionName: string): any {
        console.log("[Menu Model] Adding section ...");
        const updateObject = {
            $set: {
                [`menuSections.${sectionName}`]: []
            }
        };

        // find the menu based on the restaurantId, and menuId and add the new menu section
        var query = this.model.updateOne(
            { menuID: addMenu["menuID"], restaurantID: addMenu["restaurantID"] },
            updateObject, { upsert: true }
        );

        query.exec((err, menuSectionArray) => {
            response.json(menuSectionArray);
            this.error_message(err, response);
        });
    }

    /**
     * check a single item by ID
     *@param filter - filter object
     *@returns - true if item exist.
     */
    public async checkItemInSection(filter: any, itemID: string): Promise<any> {
        try {
            console.log("[MenuModel] Checking if item\n" + itemID + "\nexist in a section ...");
            const searchItemObj = [
                {
                    $match: {
                        menuID: filter["menuID"],
                        restaurantID: filter["restaurantID"]
                    }
                },
                {
                    $project: {
                        count: {
                            $reduce: {
                                input: {
                                    $objectToArray: "$menuSections"
                                },
                                initialValue: 0,
                                in: {
                                    $cond: [
                                        {
                                            $in: [
                                                itemID,
                                                "$$this.v"
                                            ]
                                        },
                                        {
                                            $add: [
                                                "$$value",
                                                1
                                            ]
                                        },
                                        "$$value"
                                    ]
                                }
                            }
                        }
                    }
                }
            ];
            const result = await this.model.aggregate(searchItemObj);
            // console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

        // TODO: FIGURE OUT WHY THIS DOESN'T WORK
        // DO NOT DELETE
        // this.model.countDocuments(filter, searchItemObj, (err, count) => {
        //     if (err) return console.error(err);
        //     return count > 0;
        // });

    /**
     * Adds an existing menu item to a menu section.
     * @param response 
     * @param menuItem Shoudl contain the restaurantId, menuId, sectionName, and itemId
     */
    public addMenuItem(response: any, menuItem: object): any {
        console.log("[Menu Model] Adding item to menu ...");

        const updateObject = {
            $push: {
                [`menuSections.${menuItem['sectionName']}`]: menuItem['itemID']
            }
        };

        // find the menu based on the restaurantOwnerId, restaurantId, and menuId
        var query = this.model.updateOne({ restaurantID: menuItem["restaurantID"], menuID: menuItem["menuID"] }, updateObject, { upsert: true });

        query.exec((err, menuItemArray) => {
            response.json(menuItemArray);
            this.error_message(err, response);
        });
    }

    public updateMenuTime(response: any, filter: object, startTime: String, endTime: String): any {
        console.log("[Menu Model] Updating menu time ...");

        const updateObject = {
            $set: {
                menuStartTime: startTime,
                menuEndTime: endTime
            }
        };

        // find the menu based on the restaurantOwnerId, restaurantId, and menuId
        var query = this.model.updateOne(filter, updateObject, { upsert: true });

        query.exec((err, menuItemArray) => {
            response.json(menuItemArray);
            this.error_message(err, response);
        });
    }

}
export { MenuModel };
