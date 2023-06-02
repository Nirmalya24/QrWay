import Mongoose = require("mongoose");
import { DataAccess } from './../DataAccess';
import { IUsersModel } from '../interfaces/IUsersModel';

let mongooseConnection = DataAccess.mongooseConnection;

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
            }, { collection: 'Users' }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUsersModel>("Users", this.schema);
    }

    /**
     * Get all the users in the database
     * @param response 
     */
    public retrieveAllUsers(response: any): any {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    /**
     * Get all user in db count
     * @param response 
     */
    public retrieveUsersCount(response: any): any {
        console.log("retrieving Users Count ...");
        var query = this.model.estimatedDocumentCount();
        query.exec((err, numberOfLists) => {
            console.log("numberOfUsers: " + numberOfLists);
            response.json(numberOfLists);
        });
    }

    /**
     * Retrieve a user by userID
     * @param response 
     * @param filter 
     */
    // TODO: Fix/Test this method
    public retrieveUser(response: any, filter: Object) {
        console.log("[UsersModel] Retrieving user...");
        var query = this.model.find(filter);
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }

    /**
     * Create a new user in the database
     * @param response
     */
    // TODO: Fix/Test this method
    public registerNewUser(response: any, body: any): any {
        console.log("[UsersModel] Creating new user...");
        console.log("[UsersModel] userID: " + body.userID);
        console.log("[UsersModel] oauthID: " + body.oauthID);
        console.log("[UsersModel] email: " + body.email);
        console.log("[UsersModel] image: " + body.image);
        // query db to create a new user
    }
}
export { UsersModel };