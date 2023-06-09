require('dotenv').config();
import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
   static DB_CONNECTION_STRING: string = process.env.ATLAS_URI;

    constructor() {
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;

        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseConnection.on("error", (err: any) => {
            console.log("Could not connect to mongodb.");
            console.log(err);
        });


        return this.mongooseInstance;
    }

}
DataAccess.connect();
export { DataAccess };