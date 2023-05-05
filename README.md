
# QrWay

### Team Members
Adit, Jen, Nirmalya, Troy

File content:
* `Server.ts` - based http server
* `App.ts` - express server
* `DataAccess.ts` - mongo db client
* DB population files are stored under the `createDB/` folder

Make sure you have installed the Node.js server and Mongo DB on your machine.  Ensure your path variable contains the execution path of the Node.js and Mongo binary (refer to official docs for instructions).

## Step 1: Install Node Modules 🤠
In your terminal, run:
```shell
npm install
```
This will install the required modules for this project. This is required for Step 3, since the connection
is made using Mongoose to the MongoDB instance.

__NOTE: Make sure MongoDB instance is running on your machine (varies based on OS: refer MongoDB docs)__

## Step 2: MongoDB db creation and user role creation 🎉

```shell
mongosh

use qrway_db

# copy and paste code snippet from createDB/createAdminUser.js
```

### Step 3: Populating the database 🤩
Run the following script (present in `package.json`) in your shell:

```shell
npm run populate_db
```

This will delete any existing items in the `qrway_db` and reseed the values for all the collections

### Step 4: Import Postman collections 🪄
The Postman collection file is located in the root directory. It is called `QrWay.postman_collection.json`.
Go ahead and import that into your Postman.

### Step 5: Run the server 🚀
Navigate to your shell, and run the following command:
```shell
npm start
```

This is will clean (remove any *.js files) the directory, compile the TypeScript files, and start the Node server.

Once the server is up and running, Postman endpoints can be lit up 🔥