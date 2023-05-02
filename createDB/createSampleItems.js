const MongoClient = require('mongodb').MongoClient;
const colors = require('colors');

const url = 'mongodb://qrway_admin:qrway_password@localhost:27017/qrway_db?authMechanism=DEFAULT';

const itemsData = [
    {
        "itemName": "Cheeseburger",
        "itemDescription": "A juicy burger topped with melted cheese, lettuce, tomato, and pickles",
        "itemPrice": 9.99,
        "itemImg": "https://example.com/images/cheeseburger.jpg",
        "itemID": "1a0eae26-33f9-4f9a-9c98-0a49a26a4181",
        "restaurantsID": [
            "08aeb7bb-66f6-46a9-a929-2f994bcf16b1",
            "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf"
        ],
        "menusID": ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"]
    },
    {
        "itemName": "Margherita Pizza",
        "itemDescription": "Fresh mozzarella, tomato sauce, and basil on a thin crust",
        "itemPrice": 12.99,
        "itemImg": "https://example.com/images/margherita_pizza.jpg",
        "itemID": "5d9d2626-9385-4c5f-a60c-2d4f4c4e04e3",
        "restaurantsID": ["e942c3b8-3f3d-49e7-9abf-8b7f95bfa745"],
        "menusID": ["c8b07d0b-70a6-41ed-a307-8f0d12e773f6"]
    },
    {
        "itemName": "Chicken Caesar Salad",
        "itemDescription": "Grilled chicken, romaine lettuce, croutons, and Caesar dressing",
        "itemPrice": 8.99,
        "itemImg": "https://example.com/images/chicken_caesar_salad.jpg",
        "itemID": "c8b07d0b-70a6-41ed-a307-8f0d12e773f6",
        "restaurantsID": ["b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf"],
        "menusID": ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"]
    },
    {
        "itemName": "Spaghetti and Meatballs",
        "itemDescription": "Fresh pasta with homemade meatballs in tomato sauce",
        "itemPrice": 14.99,
        "itemImg": "https://example.com/images/spaghetti_and_meatballs.jpg",
        "itemID": "47a55aa6-4a29-48c2-8b32-0e9efc28441f",
        "restaurantsID": ["08aeb7bb-66f6-46a9-a929-2f994bcf16b1"],
        "menusID": [
            "fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad",
            "c8b07d0b-70a6-41ed-a307-8f0d12e773f6"
        ]
    },
    {
        "itemName": "Fish and Chips",
        "itemDescription": "Crispy battered fish with seasoned fries and tartar sauce",
        "itemPrice": 10.99,
        "itemImg": "https://example.com/images/fish_and_chips.jpg",
        "itemID": "fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad",
        "restaurantsID": [
            "e942c3b8-3f3d-49e7-9abf-8b7f95bfa745",
            "08aeb7bb-66f6-46a9-a929-2f994bcf16b1"
        ],
        "menusID": ["47a55aa6-4a29-48c2-8b32-0e9efc28441f"]
    },
    {
        "itemName": "Taco Salad",
        "itemDescription": "Ground beef, lettuce, tomato, cheese, and sour cream served in a crispy taco shell",
        "itemPrice": 7.99,
        "itemImg": "https://example.com/images/taco_salad.jpg",
        "itemID": "93c1e5b1-61ec-4e97-9ed5-5a308f531ef2",
        "restaurantsID": ["b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf"],
        "menusID": ["c8b07d0b-70a6-41ed-a307-8f0d12e773f6"]
    },
    {
        "itemName": "Sushi Combo",
        "itemDescription": "Assorted sushi rolls and sashimi served with soy sauce and wasabi",
        "itemPrice": 16.99,
        "itemImg": "https://example.com/images/sushi_combo.jpg",
        "itemID": "2a7198f6-bbf9-4395-a6c5-6af8ed1c5f95",
        "restaurantsID": ["e942c3b8-3f3d-49e7-9abf-8b7f95bfa745"],
        "menusID": ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"]
    },
    {
        "itemName": "Veggie Burger",
        "itemDescription": "A plant-based patty with lettuce, tomato, and avocado on a toasted bun",
        "itemPrice": 11.99,
        "itemImg": "https://example.com/images/veggie_burger.jpg",
        "itemID": "7a4c4d4e-06a4-4e22-9f07-9c80a10ddc51",
        "restaurantsID": [
            "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
            "08aeb7bb-66f6-46a9-a929-2f994bcf16b1"
        ],
        "menusID": ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"]
    },
    {
        "itemName": "Pad Thai",
        "itemDescription": "Stir-fried rice noodles with shrimp, chicken, egg, bean sprouts, and peanuts",
        "itemPrice": 13.99,
        "itemImg": "https://example.com/images/pad_thai.jpg",
        "itemID": "c8e8580c-52e5-43e1-a83e-6b3a6d09be6a",
        "restaurantsID": ["e942c3b8-3f3d-49e7-9abf-8b7f95bfa745"],
        "menusID": ["fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad"]
    },
    {
        "itemName": "Margherita Pizza",
        "itemDescription": "Tomato sauce, fresh mozzarella cheese, and basil on a thin crust",
        "itemPrice": 14.99,
        "itemImg": "https://example.com/images/margherita_pizza.jpg",
        "itemID": "6ef20e3c-bb6e-4476-82d2-2bf6e0dd6f47",
        "restaurantsID": [
            "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf",
            "08aeb7bb-66f6-46a9-a929-2f994bcf16b1"
        ],
        "menusID": ["c8b07d0b-70a6-41ed-a307-8f0d12e773f6"]
    },
    {
        "itemName": "Fettuccine Alfredo",
        "itemDescription": "Creamy garlic Parmesan sauce with fettuccine noodles",
        "itemPrice": 12.99,
        "itemImg": "https://example.com/images/fettuccine_alfredo.jpg",
        "itemID": "a8b93f6a-1196-4d54-8ce8-4d4b9eb4d69e",
        "restaurantsID": [
            "e942c3b8-3f3d-49e7-9abf-8b7f95bfa745",
            "b7d77d3e-14a3-4a2a-a9e9-48aa173b7fbf"
        ],
        "menusID": [
            "fc95b8de-c5e5-4c17-9f5c-b1a4e4b4b2ad",
            "c8b07d0b-70a6-41ed-a307-8f0d12e773f6"
        ]
    },
    {
        "itemName": "Beef Stir Fry",
        "itemDescription": "Sliced beef, vegetables, and rice stir-fried in a savory sauce",
        "itemPrice": 15.99,
        "itemImg": "https://example.com/images/beef_stir_fry.jpg",
        "itemID": "ef1397a2-1e8e-4f89-8240-b2a873ba0a31",
        "restaurantsID": ["08aeb7bb-66f6-46a9-a929-2f994bcf16b1"],
        "menusID": ["47a55aa6-4a29-48c2-8b32-0e9efc28441f"]
    }
]

console.log("[DB Setup] Inserting Item data into database...".yellow);

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async (client) => {
        const db = client.db('qrway_db');

        // delete any existing data
        const deleteResult = await db.collection('Items').deleteMany({});
        console.log(colors.green('\tDocuments deleted:', deleteResult.deletedCount));

        // insert data
        const insertResult = await db.collection('Items').insertMany(itemsData);
        console.log(colors.green('\tDocuments inserted:', insertResult.insertedCount));

        // count documents
        const countResult = await db.collection('Items').countDocuments();
        console.log(colors.green('\tTotal # of Documents in collection:', countResult));

        await client.close();
    })
    .catch((err) => {
        console.error(err);
    });
