const MongoClient = require("mongodb").MongoClient;
const colors = require("colors");
const dotenv = require('dotenv').config();
const url = process.env.ATLAS_URI;

const menusData = [
    {
        menuID: "b061cc9c-e85c-11ed-a05b-0242ac120003",
        restaurantID: "b061d548-e85c-11ed-a05b-0242ac120003",
        menuName: "Breakfast",
        menuItems: [],
        menuSections: {
            Mains: ["1a0eae26-33f9-4f9a-9c98-0a49a26a4181", "b061e5c4-e85c-11ed-a05b-0242ac120003"],
            Sides: ["c8b07d0b-70a6-41ed-a307-8f0d12e773f6"]
        },
        menuDescription: "Breakfast menu",
        menuStartTime: "07:00",
        menuEndTime: "11:00",
        public:true,
    },
    {
        menuID: "b061e16e-e85c-11ed-a05b-0242ac120003",
        restaurantID: "b061d732-e85c-11ed-a05b-0242ac120003",
        menuName: "Lunch",
        menuItems: [],
        menuSections: {
            Mains: ["5d9d2626-9385-4c5f-a60c-2d4f4c4e04e3"],
            Sides: ["c8b07d0b-70a6-41ed-a307-8f0d12e773f6"],
            Desserts: ["b061ef56-e85c-11ed-a05b-0242ac120003"],
        },
        menuDescription: "Lunch menu",
        menuStartTime: "11:00",
        menuEndTime: "15:00",
        public:true,
    },
    {
        menuID: "b061e2f4-e85c-11ed-a05b-0242ac120003",
        restaurantID: "b061de58-e85c-11ed-a05b-0242ac120003",
        menuName: "Dinner",
        menuItems: [],
        menuSections: {
            Mains: [
                "47a55aa6-4a29-48c2-8b32-0e9efc28441f"
            ],
            Sides: [
                "fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"
            ],
            Desserts: [
                "b061ef56-e85c-11ed-a05b-0242ac120003"
            ],
        },
        menuDescription: "Dinner menu",
        menuStartTime: "15:00",
        menuEndTime: "23:00",
        public:true,
    },
    {
        menuID: "b061e466-e85c-11ed-a05b-0242ac120003",
        restaurantID: "b061dffc-e85c-11ed-a05b-0242ac120003",
        menuName: "Brunch",
        menuItems: [],
        menuSections: {
            Mains: ["b061e722-e85c-11ed-a05b-0242ac120003"],
            Sides: ["b061ed76-e85c-11ed-a05b-0242ac120003"],
            Desserts: ["b061f0e6-e85c-11ed-a05b-0242ac120003"],
        },
        menuDescription: "Brunch menu",
        menuStartTime: "10:00",
        menuEndTime: "13:00",
        public:true,
    }
];

console.log("[DB Setup] Inserting Menu data into database...".yellow);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        const db = client.db("qrway_db");

        // delete any existing data
        const deleteResult = await db.collection("Menus").deleteMany({});
        console.log(
            colors.green("\tDocuments deleted:", deleteResult.deletedCount)
        );

        // insert data
        const insertResult = await db.collection("Menus").insertMany(menusData);
        console.log(
            colors.green("\tDocuments inserted:", insertResult.insertedCount)
        );

        // count documents
        const countResult = await db.collection("Menus").countDocuments();
        console.log(
            colors.green("\tTotal # of Documents in collection:", countResult)
        );

        await client.close();
    })
    .catch((err) => {
        console.error(err);
    });
