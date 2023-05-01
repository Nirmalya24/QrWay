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
     * Retrieve all items in item collection
     *@param response - response object
     */

    public retrieveAllItems(response:any): any {
        console.log("retrieve All Items");
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
     /**
     * count all items in item collection
     *@param response - response object
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
     *@param response - response object
     *@param filter - filter object
     *@returns - JSON Object
     */
   public retrieveItemByID(response: any, filter: Object) {
       // TODO: Check if this is working
       console.log("Query single item with filter: " + JSON.stringify(filter));
       var query = this.model.findOne(filter);
       query.exec((err, itemArray) => {
          // response.json(itemArray);
           return JSON.stringify(itemArray);

    });
    }
    /**
     * Get a single item by ID
     *@param request - request object
     *@param response - response object
     */

    public getItem(request:any,response:any): any {
        const params= request.params;
        console.log(params);
        var query = this.model.findOne(params);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
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
        const params= body;
        var item = new this.model(params);
        item.save((err, item)=> {
            if (err) return console.error(err);
            console.log(item.itemName + " saved to items collection.");
        });
            response.send(item.itemName + " saved to items collection.");
     }

}
export {ItemModel};