const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

require('dotenv').config();
const url = process.env.ATLAS_URI;

const restaurantData = [
    {
        
        restaurantName: "Family Breakfast House",
        restaurantID: "b061d548-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792cb46-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c6be-e89c-11ed-a05b-0242ac120003",
        description: "Bring one bring all! We serve breakfast all day!",
        restaurantImage: "https://restaurantclicks.com/wp-content/uploads/2022/06/breakfast-seattle-wa.jpg",
        tag: "Breakfast",
        menusID: ["b061cc9c-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Frankies",
        restaurantID: "b061d732-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792cb46-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        description: "To be frank with you, we have the best hot dogs in town!",
        restaurantImage: "https://image.jimcdn.com/app/cms/image/transf/dimension=2048x2048:format=jpg/path/s8664f7cceec02e9d/image/if14a51a7c5050432/version/1469747337/image.jpg",
        tag: "Hot Dawgs",
        menusID: ["b061e16e-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Joe's Diner",
        restaurantID: "b061de58-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792ccc2-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        description: "A diner with a little bit of everything!",
        restaurantImage: "https://assets3.thrillist.com/v1/image/1579997/1200x600/scale",
        tag: "Diner",
        menusID: ["b061e2f4-e85c-11ed-a05b-0242ac120003"],
    },
    {
        restaurantName: "Wingman's Pub",
        restaurantID: "b061dffc-e85c-11ed-a05b-0242ac120003",
        managerID: ["d792ccc2-e89c-11ed-a05b-0242ac120003"],
        restaurantOwnerID: "d792c9a2-e89c-11ed-a05b-0242ac120003",
        description: "A pub with the best wings in town!",
        restaurantImage: "https://1.bp.blogspot.com/-oMUhUi9BVhc/W0NEHhbrxRI/AAAAAAAARq8/OQ6OLV5XZpcuZ1RoTbT7Cg-D4-tpmyy4ACLcBGAs/s1600/P1260822.JPG",
        tag: "Wings",
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
