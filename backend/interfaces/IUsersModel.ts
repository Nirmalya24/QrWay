import Mongoose = require("mongoose");

interface IUsersModel extends Mongoose.Document {
    userID: string;
    oauthID: string;
    name: string;
    profile_image: string;
    email: string;
}
export { IUsersModel };