const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

const url = 'mongodb://qrway_admin:qrway_password@localhost:27017/qrway_db?authMechanism=DEFAULT';

const userData = [
    {   //restaurant owner
        userID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default        
    },
    {   //restaurant manager
        userID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default
    },
    {   //restaurant manager
        userID: "d792cb46-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default
    },
    {   //restaurant manager
        userID: "d792ccc2-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default
    },
    {   //restaurant manager
        userID: "d792d136-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default
    }
    
];

console.log("[DB Setup] Inserting User data into database...".yellow);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        const db = client.db('qrway_db');

        // delete any existing data
        const deleteResult = await db.collection('Users').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResult = await db.collection('Users').insertMany(userData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResult = await db.collection('Users').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        await client.close();
    })
    .catch((err) => {
        console.error(err);
    });
