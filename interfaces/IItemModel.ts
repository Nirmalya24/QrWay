import Mongoose = require("mongoose");

interface IItemModel extends Mongoose.Document {
    itemName: string;
    itemDecription:string;
    itemPrice: number,
    itemImg:string;
    itemID:string,
}
export {IItemModel};