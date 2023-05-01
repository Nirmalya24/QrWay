import Mongoose = require("mongoose");
import { IItemModel } from "./IItemModel";

interface IMenuModel extends Mongoose.Document {
    menuID: string;
    restaurantID: string;
    menuName: string;
    menuItems: [string];
    menuSections: object;
    menuDescription: string;
    menuStartTime: Mongoose.Date;
    menuEndTime: Mongoose.Date;
}
export { IMenuModel };


