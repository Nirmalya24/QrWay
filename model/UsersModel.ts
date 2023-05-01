import Mongoose = require("mongoose");
import { DataAccess } from './../DataAccess';
import { IUsersModel } from '../interfaces/IUsersModel';

let mongooseConnection = DataAccess.mongooseConnection;
// let mongooseObj = DataAccess.mongooseInstance;

class UsersModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userID:String,
                password:String,
                connectStatus:Boolean,
            }, { collection: 'users' }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUsersModel>("User", this.schema);
    }

    public retrieveAllUsers(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    public retrieveUsersCount(response: any): any {
        console.log("retrieving Users Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfLists) => {
            console.log("numberOfUsers: " + numberOfLists);
            response.json(numberOfLists);
        });
    }
}
export { UsersModel };