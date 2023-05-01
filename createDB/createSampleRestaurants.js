db = db.getSiblingDB('qrway_db')
db.createCollection('Restaurants')
restaurantsCollection = db.getCollection("Restaurants")
restaurantsCollection.remove({})

restaurantsCollection.insert(
    {
        
    }
)