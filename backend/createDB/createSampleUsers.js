const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

require('dotenv').config();
const url = process.env.ATLAS_URI;

const userData = [
    {   //restaurant owner
        userID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        oauthID: "104614855274143111125",
        name: "John Hancock",
        profile_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/800px-Pierre-Person.jpg",    
        email: "John@gmail.com",
        isOwner: true,
        isManager: false
    },
    {   //restaurant owner
        userID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        oauthID: "116859596298139974913",
        name: "Jack Yu",
        profile_image: "https://imageio.forbes.com/specials-images/imageserve/61688aa1d4a8658c3f4d8640/Antonio-Juliano/0x0.jpg?format=jpg&width=960",
        email: "jackyu@gmail.com",
        isOwner: true,
        isManager: false
    },
    {   //restaurant manager
        userID: "d792cb46-e89c-11ed-a05b-0242ac120003",
        oauthID: "102214293457696912326",
        name: "Kale",
        profile_image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/153FD/production/_126973078_whatsubject.jpg",
        email: "kale@gmail.com",
        isOwner: false,
        isManager: true
    },
    {   //restaurant manager
        userID: "d792ccc2-e89c-11ed-a05b-0242ac120003",
        oauthID: "111595759389992803679",
        name: "Rose Pender",
        profile_image: "https://precisionhealth.iu.edu/images/BernicePescosolido.jpg",
        email: "rose@gmail.com",
        isOwner: false,
        isManager: true
    },
    {   //restaurant manager
        userID: "d792d136-e89c-11ed-a05b-0242ac120003",
        oauthID: "",
        name: "Kelly Ripa",
        profile_image: "https://architecture.ou.edu/wp-content/uploads/2018/07/ANGELAPERSON-1447-300x300.jpg",
        email: "kellyripa@gmail.com",
        isOwner: false,
        isManager: true
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
        userID: "d792cb46-e89c-11ed-a05b-0242ac120003",
        managerName: "Kale",
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061d548-e85c-11ed-a05b-0242ac120003"]
    },
    {   //restaurant manager
        userID: "d792ccc2-e89c-11ed-a05b-0242ac120003",
        managerName: "Rose Pender",
        restaurantOwnerID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061d732-e85c-11ed-a05b-0242ac120003"]
    },
    {   //restaurant manager
        userID: "d792d136-e89c-11ed-a05b-0242ac120003",
        managerName: "Kelly Ripa",
        restaurantOwnerID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        restaurantID:["b061de58-e85c-11ed-a05b-0242ac120003"]
    },

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
