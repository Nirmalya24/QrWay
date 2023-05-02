import Mongoose = require("mongoose");

interface IUsersModel extends Mongoose.Document {
    userID:string;
    password:string;
    connectStatus:boolean;
}
export { IUsersModel };