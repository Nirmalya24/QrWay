import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantOwnerModel} from '../interfaces/IRestaurantOwnerModel';
import { RestaurantModel } from "./RestaurantModel";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantOwnerModel {
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
                //IRestaurantOwnerModel
                restaurantList: [RestaurantModel]
            }, {collection: 'Restaurant Owners'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<RestaurantOwnerModel>("Restaurant Owners", this.schema);
    }

}

export {RestaurantOwnerModel}
