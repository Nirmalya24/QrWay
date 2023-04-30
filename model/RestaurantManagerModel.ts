import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantManagerModel} from '../interfaces/IRestaurantManagerModel';

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

}

export {RestaurantManagerModel}
