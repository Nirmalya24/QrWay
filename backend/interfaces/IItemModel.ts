import Mongoose = require("mongoose");

interface IItemModel extends Mongoose.Document {
    itemName: string;
    itemDecription:string;
    itemPrice: number,
    itemImg:string;
    itemID:string,
    restaurantsID:string[],// delete from db if empty 
    menusID:string[]
}
export {IItemModel};