import Mongoose = require("mongoose");
import { IUsersModel } from "./IUsersModel";

interface IRestaurantManager extends IUsersModel {
    managerName: string;
    restaurantOwnerID:string;
    restuarantID:string;
}
export {IRestaurantManager};