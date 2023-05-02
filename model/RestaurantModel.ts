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

    /**
     * Retrieve all restaurants to restaurant owner
     * 
     * @param {Object}response - HTTP response Object
     * @param {string}restaurantOwnerID - Restaurant owner ID
     * @return {Promise<Array<Object>>} - A Promise to resolve an array of restaurant objects
     * @throws {err} - throw error when errors occur during databse querying
     */
    public async retrieveAllRestaurants(response: any, restaurantOwnerID: string): Promise<any> {
        try {
            console.log("start query");
            const query = this.model.find({ restaurantOwnerID: restaurantOwnerID });
            const itemArray = await query.exec();
            return itemArray;
        } catch (err) {
            throw err;
        }
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

    /**
     * Retrieve restaurant from database that matches the provided filter
     * 
     *@param {Object} filter - The filter used to query database
     *@returns {Promise<Object>} - A Promise resolves to the restaurant document that matches the provided filter
     *@throws {Error} - throw error when errors occur during databse querying
     */
    public async getRestaurantByID(filter: Object): Promise<any> {
        console.log(`[Menu Model] getRestaurantByID: ${filter['restaurantID']}`);
        try {
            const query = this.model.findOne(filter);
            const itemArray = await query.exec();
            console.log("[Menu Model | DEBUG] getRestaurantByID: " + itemArray);
            return itemArray;
        } catch (err) {
            throw err;
        }
    }

}
export {RestaurantModel};