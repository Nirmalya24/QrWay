import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IRestaurantModel} from '../interfaces/IRestaurantModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RestaurantModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                restaurantName:String,
                restaurantId:String,
                managerID: [String],
                restaurantOwnerId:String,
                menusID:[String],
            },{collection: 'Restaurants'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("Restaurants", this.schema);
    }

    public retrieveAllRestaurants(response:any): any {
        console.log("start query");
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            if (err) return console.error(err);
            response.json(itemArray) ;
        });
    }
    public retrieveListCount(response:any): any {
        console.log("retrieve Restaurants Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfLists) => {
            if (err) return console.error(err);
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }
    public getRestaurantByID(response: any, filter: Object): any {
        // TODO: Implement this
        console.log(filter)
         var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            if (err) return console.error(err);
            response.json(itemArray) ;
        });

    }
}
export {RestaurantModel};