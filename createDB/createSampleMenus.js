db = db.getSiblingDB('qrway_db')
db.createCollection('Menus')
menusCollection = db.getCollection("Menus")
menusCollection.remove({})

menusCollection.insert(
    {
        
    }
)