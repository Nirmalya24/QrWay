import Mongoose = require("mongoose");

interface IRestaurantModel extends Mongoose.Document {
    restaurantName: string;
    restaurantID:string;
    managerID:[String],
    restaurantOwnerID:string;
    menusID:[String],
}
export {IRestaurantModel};