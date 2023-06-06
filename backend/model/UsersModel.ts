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
                oauthID:String,
                name:String,
                profile_image:String,
                email:String,
                isOwner: Boolean,
                isManager:Boolean,
            }, { collection: 'Users' ,versionKey: false }
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
    public async retrieveUser(response: any, filter: Object):Promise<any> {
        console.log("[UsersModel] Retrieving user...");
        try {
            const query = this.model.findOne(filter);
            const User = await query.exec();
            console.log("[User Model | DEBUG] Retrieved User: " + User.userID);
            return User;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Create a new user in the database
     * @param response
     */
    // TODO: Fix/Test this method
    public async registerNewUser(response: any, newUser: any): Promise<any> {
        //  console.log("[UsersModel] Creating new user...");
        //  console.log("[UsersModel] userID: " + newUser.id);
        // console.log("[UsersModel] oauthID: " + newUser.oauthID);
        // console.log("[UsersModel] email: " + newUser.email);
        // console.log("[UsersModel] image: " + newUser.image);
        // console.log("[UsersModel] isOwner: " + newUser.isOwner);
        // let setUser: object = {
        //     userID: crypto.randomUUID(),
        //     oauthID: newUser.id,
        //     name: newUser.displayName,
        //     profile_image: newUser.photos[0].value,
        //     email: newUser.emails[0].value,
        //     isOwner: true,
        //     isManager:false,
        //     connectStatus: true
        //   };

        // query db to create a new user
        console.log("[UsersMoel Model] Registering a new user ...");
        try {
            console.log("[Restaurant Model] Registering...");
            const query = new this.model(newUser);
            const user = await query.save();
            console.log("[User Model | DEBUG] registerNewUser: " + user);
            return user;
        } catch (err) {
            throw err;
        }
    }
}
export { UsersModel };