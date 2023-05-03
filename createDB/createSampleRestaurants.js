const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

const url = 'mongodb://qrway_admin:qrway_password@localhost:27017/qrway_db?authMechanism=DEFAULT';

const restaurantData = [
    {
        restaurantName: "Family Breakfast House",
        restaurantID: "b061d548-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792c9a2-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        menusID: ["b061cc9c-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Frankies",
        restaurantID: "b061d732-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792cb46-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        menusID: ["b061e16e-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Joe's Diner",
        restaurantID: "b061de58-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792ccc2-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        menusID: ["b061e2f4-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Wingman's Pub",
        restaurantID: "b061dffc-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792d136-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        menusID: ["b061e466-e85c-11ed-a05b-0242ac120003"],
    }
];

console.log("[DB Setup] Inserting Restaurant data into database...".yellow);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        const db = client.db('qrway_db');

        // delete any existing data
        const deleteResult = await db.collection('Restaurants').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResult = await db.collection('Restaurants').insertMany(restaurantData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResult = await db.collection('Restaurants').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        await client.close();
    })
    .catch((err) => {
        console.error(err);
    });
