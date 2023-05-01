const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

const url = 'mongodb://qrway_admin:qrway_password@localhost:27017/qrway_db?authMechanism=DEFAULT';

const restaurantData = [
    {
        restaurantName: "Burger Joint",
        restaurantID: "08aeb7bb-66f6-46a9-a929-2f994bcf16b1",
        managerID: [],
        restaurantOwnerId: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        menusID: ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"],
    },
    {
        restaurantName: "Pizza Place",
        restaurantID: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        managerID: [],
        restaurantOwnerId: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        menusID: ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"],
    },
    {
        restaurantName: "Sushi Bar",
        restaurantID: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        managerID: [],
        restaurantOwnerId: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        menusID: ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"],
    },
    {
        restaurantName: "Izakaya",
        restaurantID: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        managerID: [],
        restaurantOwnerId: "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
        menusID: ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"],
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
