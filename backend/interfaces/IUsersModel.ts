import Mongoose = require("mongoose");

interface IUsersModel extends Mongoose.Document {
    userID: string; // We generate this UUID 
    oauthID: string; // Google provided ID
    name: string;
    profile_image: string;
    email: string;
    isOwner: boolean; // set this true for now
    isManager: boolean;
    connectStatus:boolean;
}
export { IUsersModel };