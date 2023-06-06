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
                restaurantName: String,
                restaurantID: String,
                managerID: [String],
                restaurantOwnerID: String,
                description: String,
                menusID: [String],
                tag: String,
                restaurantImage: String
            },
            { collection: 'Restaurants', versionKey: false }//here }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("Restaurants", this.schema);
    }

    /**
     * Create a new restaurant in database
     * @param {Object} response - HTTP response Object
     * @param {Object} restaurantObj - The restaurant object to be created
     * - restaurantName: string;
     * - restaurantID:string;
     * - managerID:[string];
     * - restaurantOwnerID: string;
     * - description: string;
     * - tag: string;
     * - restaurantImage: string;
     */
    public async createRestaurant(response: any, restaurantObj: any): Promise<any> {
        try {
            console.log("[Restaurant Model] Creating restaurant...");
            const query = new this.model(restaurantObj);
            const item = await query.save();
            console.log("[Restaurant Model | DEBUG] createRestaurant: " + item);
            response.json(item);
        } catch (err) {
            throw err;
        }
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
            console.log("[Restaurant Model] Getting all restaurants...");
            const query = this.model.find({ restaurantOwnerID: restaurantOwnerID });
            const itemArray = await query.exec().then((result) => {
                return result;
            });
            // console.log("[Restaurant Model | DEBUG] retrieveAllRestaurants: " + itemArray);
            // return itemArray;
            response.json(itemArray);
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
    /**
     * update restaurant values from database that matches the provided filter
     * 
     *@param {Object} filter - The filter used to query database
     *@param {Object} update - The update used to update database
     *@returns {Promise<Object>} - A Promise resolves to the restaurant document that matches the provided filter
     *@throws {Error} - throw error when errors occur during databse querying
     */
     public async updateRestaurantByID(filter: Object,update:Object): Promise<any> {
       // console.log(`[Restaurant Model] updateRestaurantByID: ${filter['restaurantID']}`);
        console.log(`[Restaurant Model] Updatetag: ${update['tag']}`)
        console.log(`[Restaurant Model] UpdateImage: ${update['restaurantImage']}`)
        try {
            const result = await this.model.findOneAndUpdate(filter,update,{new:true});
         //   const itemArray = await query.exec();
            console.log("[Restaurant Model | DEBUG] UpdateRestaurant: " + result);
            return true;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete restaurant by ID
     * 
     */
    public async deleteRestaurant(filter: object): Promise<any> {
        try {
            console.log("[RestaurantModel] Deleting Restaurant...");
            const checkRestaurant = await this.getRestaurantByID(filter)
            .then((restaurant) => {
                if(restaurant === null || JSON.stringify(restaurant) === '{}') {
                    return false;
                }
                return true;
            });

            if(!checkRestaurant) {
                return null;
            }

            console.log("[Restaurant Model] Result of getRestaurantByID: ", checkRestaurant);
            const query = await this.model.deleteOne(filter).then((restaurant) => {
                return restaurant;
            });
            console.log("[Restaurant Model] Result of delete query: ", query);
            return query;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
export {RestaurantModel};