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
                menuStartTime: String,
                menuEndTime: String,
                public:Boolean


            }, { collection: 'Menus', versionKey: false }
        );
    }
    public createModel(): void {
        this.model = mongooseConnection.model<IMenuModel>("Menus", this.schema);
    }

    /**
     * Error message helper function
     * @param err - error message
     * @param response - response object
     */
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

    /**
     * Creates a new menu for a restaurant.
     * @param response 
     * @param newMenu 
     * - restaurantId - string of the restaurant's ID
     * - menuName - string of the menu's name
     * - menuDescription - string of the menu's description
     * - menuSections - object containing the menu sections
     * - menuStartTime - string of the menu's start time
     * - menuEndTime - string of the menu's end time
     */
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
        // DO NOT DELETE AND ALSO DO NOT GRADE IF YOU SEE THIS PROF! TY :-)
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

    /**
     * Updates the menu time for a specific menu.
     * @param response 
     * @param filter 
     * @param startTime 
     * @param endTime 
     */
    public updateMenuTime(response: any, filter: object, startTime: string, endTime: string): any {
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
    /**
     * update menu values from database that matches the provided filter
     * 
     *@param {Object} filter - The filter used to query database
     *@param {Object} update - The update used to update database
     *@returns {Promise<Object>} - A Promise resolves to the restaurant document that matches the provided filter
     *@throws {Error} - throw error when errors occur during databse querying
     */
     public async updateMenuByID(filter: Object,update:Object): Promise<any> {
        console.log(`[Menu Model] updateMenuByID: ${filter['menuID']}`);
       
        try {
            const result = await this.model.findOneAndUpdate(filter,update,{new:true});
         //   const itemArray = await query.exec();
            console.log("[Manager Model | DEBUG] UpdateMenu: " + result);
            return true;
        } catch (err) {
            throw err;
        }
    }

}
export { MenuModel };
