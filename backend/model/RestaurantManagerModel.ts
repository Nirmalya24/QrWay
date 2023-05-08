import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IRestaurantManagerModel } from "../interfaces/IRestaurantManagerModel";
import { response } from "express";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantManagerModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                //IUsersModel
                userID: String,
                password: String,
                connectStatus: Boolean,
                //IRestaurantManagerModel
                managerName: String,
                restaurantOwnerID: String,
                restuarantID: String,
            },
            { collection: "RestaurantManager" }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantManagerModel>(
            "RestaurantManagers",
            this.schema
        );
    }

    public error_message(err: any, response: any) {
        if (err) {
            console.log("[RestaurantManager Model] " + err);
            response.json({ message: "error", data: err });
        } else {
            console.log("[RestaurantManager Model] Success");
        }
    }

    /**
     * Get all the restaurant managers for a restaurant owner
     * the database by restaurantOwnerID
     * @param res 
     * @param restaurantOwnerID - the restaurant owner's ID
     * @returns 
     */
    public async retrieveAllRestaurantManagers(res: any, restaurantOwnerID: string): Promise<any> {
        try {
            console.log("[RestaurantManager Model] Getting all restaurant managers...");
            const query = this.model.find({ restaurantOwnerID: restaurantOwnerID });
            const managersArr = await query.exec().then((managers) => {
                return managers;
            });
            console.log("[RestaurantManager Model] Manager Array: " + managersArr);
            return managersArr;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    /**
     * Create a new restaurant manager
     * @param res - response object
     * @param newRestaurantManager - the new restaurant manager object should contain
     * - password: string
     * - managerName: string
     * - restaurantOwnerID: string
     * - restuarantID: string
     */
    public createRestaurantManager(res: any, newRestaurantManager: object): any {
        console.log("[RestaurantManager Model] Creating restaurant manager...");
        var query = this.model
            .create(newRestaurantManager)
            .then((restaurantManager) => {
                res.json(restaurantManager);
            })
            .catch((err) => {
                this.error_message(err, res);
            });

        console.log("[RestaurantManager Model] Success!");
    }
}

export { RestaurantManagerModel };
