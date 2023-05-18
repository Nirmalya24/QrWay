const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');
const dotenv = require('dotenv').config();
const url = process.env.ATLAS_URI;

const userData = [
    {   //restaurant owner
        userID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default        
    },
    {   //restaurant manager
        userID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        managerName: "Jack",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003"
    },
    {   //restaurant manager
        userID: "d792cb46-e89c-11ed-a05b-0242ac120003",
        managerName: "Bob",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003"
    },
    {   //restaurant manager
        userID: "d792ccc2-e89c-11ed-a05b-0242ac120003",
        managerName: "Rose",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003"
    },
    {   //restaurant manager
        userID: "d792d136-e89c-11ed-a05b-0242ac120003",
        password: "Kelly",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003"
    }
    
];

const restaurantOwnerData = [
    {   //restaurant owner
        userID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        password: "pwd",
        connectStatus: false //false by default        
    }
];

const restaurantManagerData = [
    {   //restaurant manager
        userID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        managerName: "Jack",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061d548-e85c-11ed-a05b-0242ac120003"]
    },
    {   //restaurant manager
        userID: "d792cb46-e89c-11ed-a05b-0242ac120003",
        managerName: "Jack",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061d548-e85c-11ed-a05b-0242ac120003"]
    },
    {   //restaurant manager
        userID: "d792ccc2-e89c-11ed-a05b-0242ac120003",
        managerName: "Bob",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061d548-e85c-11ed-a05b-0242ac120003"]
    },
    {   //restaurant manager
        userID: "d792d136-e89c-11ed-a05b-0242ac120003",
        managerName: "Rose",
        password: "pwd",
        connectStatus: false, //false by default
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061de58-e85c-11ed-a05b-0242ac120003"]
    }
];

console.log("[DB Setup] Inserting User data into database...".yellow);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        const db = client.db('qrway_db');

        /* Users collection */
        // delete any existing data
        const deleteResult = await db.collection('Users').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResult = await db.collection('Users').insertMany(userData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResult = await db.collection('Users').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        /* Restaurant Owner collection*/
        // delete any existing data
        const deleteResultRestaurantOwner = await db.collection('RestaurantOwner').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResultRestaurantOwner = await db.collection('RestaurantOwner').insertMany(restaurantOwnerData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResultRestaurantOwner = await db.collection('RestaurantOwner').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        /* Restaurant Manager collection*/
        // delete any existing data
        const deleteResultRestaurantManager = await db.collection('RestaurantManager').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResultRestaurantManager = await db.collection('RestaurantManager').insertMany(restaurantManagerData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResultRestaurantManager = await db.collection('RestaurantManager').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        await client.close();
    })
    .catch((err) => {
        console.error(err);
    });
