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
        this.model = mongooseConnection.model<IRestaurantOwnerModel>("Restaurant Owners", this.schema);
    }

    public error_message(err: any, response: any) {
        if (err) {
            console.log("[RestaurantOwner Model] " + err);
            response.json({ "message": "error", "data": err });
        } else {
            console.log("[RestaurantOwner Model] Success");
        }
    }    

    public retrieveAllRestaurantOwners(res:any): any {
        console.log("Getting all restaurant owners...");
        var query = this.model.find({});
        query.exec( (err, ownersArr) => {
            res.json(ownersArr);
        });
    }

    public createRestaurantOwner(res: any, newRestaurantOwner: object): any {
        console.log("Creating restaurant owner...");
        var query = this.model.create(newRestaurantOwner)
            .then((restaurantOwner) => {
                res.json(restaurantOwner);
            })
            .catch((err) => {
                this.error_message(err, res);
            })

        console.log("[RestaurantOwner Model] Success!");
    }

}

export {RestaurantOwnerModel}
