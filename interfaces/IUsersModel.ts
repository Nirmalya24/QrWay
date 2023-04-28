import Mongoose = require("mongoose");

interface IUsersModel extends Mongoose.Document {
    name: string;
    description: string;
    listId: string;
    due: string;
    state: string;
    owner: string;
}
export { IUsersModel };