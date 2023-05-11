import Mongoose = require("mongoose");

interface IRestaurantModel extends Mongoose.Document {
    restaurantName: string;
    restaurantID:string;
    managerID:[string],
    restaurantOwnerID: string;
    description: string;
    menusID:[string],
}
export {IRestaurantModel};