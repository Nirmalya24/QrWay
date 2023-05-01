import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IItemModel} from '../interfaces/IItemModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class ItemModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                itemName:String,
                itemDecription:String,
                itemPrice: Number,
                itemImg:String,
                itemID:String,
                restaurantsID:[String],
                menusID:[String]

            },{collection: 'items'}
        );
    }
    public createModel(): void {
        this.model = mongooseConnection.model<IItemModel>("Items", this.schema);
    }

    /**
     * Retrieves all the items from 
     * @param response - response object
     * 
     */
    public retrieveAllItems(response:any): any {
        console.log("start query");
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    /**
     * Get the number of items in the database
     * @param response - response object
     */
    public retrieveItemsCount(response:any): any {
        console.log("retrieve Restaurants Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec( (err, numberOfLists) => {
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }

    /**
     * Retrieve a single item by ID
     * @param response - response object
     * @param filter - filter object
     */
    public retrieveItemByID(response: any, filter: Object) {
        console.log("Query single item with filter: " + JSON.stringify(filter));
        var query = this.model.findOne(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    /**
     * Create a new item
     * @param response - response object
     * @param body - body object containing the item information. Should contain:
     *  - itemName
     *  - itemDescription
     *  - itemPrice
     *  - itemImg
     *  - itemID
     *  - restaurantsID
     *  - menusID
     */
    public createItem(response: any, body: any): any {

    }

}
export {ItemModel};