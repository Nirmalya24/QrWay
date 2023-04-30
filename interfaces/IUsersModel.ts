import Mongoose = require("mongoose");

interface IUsersModel extends Mongoose.Document {
    userID:string;
    password:string;
    connectStatus:boolean;
    //TO DO:
    //how to include 'verify_credentials()' method in this interface?
}
export { IUsersModel };