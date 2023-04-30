import Mongoose = require("mongoose");
import { IRestaurantModel } from "./IRestaurantModel";
import { IUsersModel } from "./IUsersModel";

interface IRestaurantOwner extends IUsersModel {
    restaurantList: [IRestaurantModel];
}
export {IRestaurantOwner};