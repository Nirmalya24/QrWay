const MongoClient = require("mongodb").MongoClient;
const colors = require("colors");

const url =
    "mongodb://qrway_admin:qrway_password@localhost:27017/qrway_db?authMechanism=DEFAULT";

const menusData = [
    {
        menuID: "1",
        restaurantID: "1",
        menuName: "Breakfast",
        menuItems: [],
        menuSections: {
            Mains: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            Sides: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
            Drinks: ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            Desserts: ["31", "32", "33", "34", "35", "36", "37", "38", "39", "40"],
        },
        menuDescription: "Breakfast menu",
        menuStartTime: "07:00",
        menuEndTime: "11:00",
    },
    {
        menuID: "2",
        restaurantID: "1",
        menuName: "Lunch",
        menuItems: [],
        menuSections: {
            Mains: ["41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
            Sides: ["51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
            Drinks: ["61", "62", "63", "64", "65", "66", "67", "68", "69", "70"],
            Desserts: ["71", "72", "73", "74", "75", "76", "77", "78", "79", "80"],
        },
        menuDescription: "Lunch menu",
        menuStartTime: "11:00",
        menuEndTime: "15:00",
    },
    {
        menuID: "3",
        restaurantID: "1",
        menuName: "Dinner",
        menuItems: [],
        menuSections: {
            Mains: ["81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
            Sides: ["91", "92", "93", "94", "95", "96", "97", "98", "99", "100"],
            Drinks: [
                "101",
                "102",
                "103",
                "104",
                "105",
                "106",
                "107",
                "108",
                "109",
                "110",
            ],
            Desserts: [
                "111",
                "112",
                "113",
                "114",
                "115",
                "116",
                "117",
                "118",
                "119",
                "120",
            ],
        },
        menuDescription: "Dinner menu",
        menuStartTime: "15:00",
        menuEndTime: "23:00",
    },
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
