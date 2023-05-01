import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantManagerModel} from '../interfaces/IRestaurantManagerModel';
import { response } from "express";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantManagerModel {
    public schema:any;
    public model:any;

    public constructor () {
        this.createSchema();
        this.createModel();
    }

    public createSchema():void {
        this.schema = new Mongoose.Schema (
            {  
                //IUsersModel
                userID:String,
                password:String,
                connectStatus:Boolean,
                //IRestaurantManagerModel
                managerName: String,
                restaurantOwnerID:String,
                restuarantID:String,
            }, {collection: 'Restaurant Managers'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantManagerModel>("Restaurant Managers", this.schema);
    }

    public getAllRestaurantManagers(res:any): any {
        console.log("Getting all restaurant managers...");
        var query = this.model.find({});
        query.exec( (err, managersArr) => {
            response.json(managersArr);
        });
    }

    

}

export {RestaurantManagerModel}
