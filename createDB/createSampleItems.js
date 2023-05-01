db = db.getSiblingDB('qrway_db')
db.createCollection('Items')
itemsCollection = db.getCollection("Items")
itemsCollection.remove({})

itemsCollection.insert(
    {
        
    }
)