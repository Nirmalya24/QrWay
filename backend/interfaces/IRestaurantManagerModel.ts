import Mongoose = require("mongoose");
import { IUsersModel } from "./IUsersModel";

interface IRestaurantManagerModel extends IUsersModel {
    managerName: string;
    restaurantOwnerID: string;
    restuarantID: string;
}
export {IRestaurantManagerModel};