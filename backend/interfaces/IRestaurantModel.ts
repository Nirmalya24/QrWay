import Mongoose = require("mongoose");

interface IRestaurantModel extends Mongoose.Document {
    restaurantName: string;
    restaurantID:string;
    managerID:[string],
    restaurantOwnerID: string;
    description: string;
    menusID:[string],
    tag:string,
    restaurantImage:string
}
export {IRestaurantModel};