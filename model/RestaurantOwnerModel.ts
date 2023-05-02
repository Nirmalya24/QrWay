import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantOwnerModel} from '../interfaces/IRestaurantOwnerModel';
var RestaurantSchema = require('./RestaurantModel').schema

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
                restaurantList: [String]
            }, {collection: 'RestaurantOwners'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantOwnerModel>("RestaurantOwners", this.schema);
    }

}

export {RestaurantOwnerModel}
