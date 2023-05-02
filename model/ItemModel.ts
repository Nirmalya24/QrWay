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

            },{collection: 'Items'}
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
            if (err) return console.error(err);
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
            if (err) return console.error(err);
            console.log("numberOfLists: " + numberOfLists);
            response.json(numberOfLists) ;
        });
    }
    /**
     * check a single item by ID
     *@param filter - filter object
     *@returns - true if item exist.
     */
   public checkItem(filter: Object):any {
       console.log("check if item"+filter+" in the Items collection");
       var query = this.model.findOne(filter);
       query.exec((err, itemArray) => {
        if (err) return console.error(err);
          // response.json(itemArray);
           if(itemArray!=null)
                return true;
            else
                return false;    
    });
    }
    /**
     * Get a single item by ID
     *@param request - request object
     *@param response - response object
     */

    public getItem(response:any,filter:object): any {
       // const params= request.params;
       // console.log(params);
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            if (err) return console.error(err);
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
     public createItem(response: any, item: any): any {
        //const params= body;
        var item = new this.model(item);
        item.save((err, item)=> {
            if (err) return console.error(err);
            console.log(item.itemName + " saved to items collection.");
        });
            response.send(item.itemName + " saved to items collection.");
     }
     

}
export {ItemModel};