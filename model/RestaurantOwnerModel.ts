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
                restaurantList: [{type: Mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel'}]
            }, {collection: 'Restaurant Owners'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantOwnerModel>("Restaurant Owners", this.schema);
    }

    public retrieveAllRestaurantOwners(res:any): any {
        console.log("Getting all restaurant owners...");
        var query = this.model.find({});
        query.exec( (err, ownersArr) => {
            res.json(ownersArr);
        });
    }

}

export {RestaurantOwnerModel}
