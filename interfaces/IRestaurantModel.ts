import Mongoose = require("mongoose");

interface IRestaurantModel extends Mongoose.Document {
    restaurantName: string;
    restaurantId:string;
    managerID:[String],
    restaurantOwnerId:string;
    menusID:[String],
}
export {IRestaurantModel};