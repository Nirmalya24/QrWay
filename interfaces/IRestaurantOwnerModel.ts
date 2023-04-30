import Mongoose = require("mongoose");
import { IRestaurantModel } from "./IRestaurantModel";
import { IUsersModel } from "./IUsersModel";

interface IRestaurantOwnerModel extends IUsersModel {
    restaurantList: [IRestaurantModel];
}
export {IRestaurantOwnerModel};