/**
 * This script will create sample users for the QRWay application.
 * 
 */

/* Populate All Users */
db = db.getSiblingDB('qrway_db')
db.createCollection('Users')
usersCollection = db.getCollection("Users")
usersCollection.remove({})

usersCollection.insert(
    {
        
    }
)

/* Associate Users to Restaurant Owners */
db.createCollection('RestaurantOwners')
ownersCollection = db.getCollection("RestaurantOwners")
ownersCollection.remove({})

ownersCollection.insert(
    {
        
    }
)

/* Associate Users Managers */
db.createCollection('Managers')
managersCollection = db.getCollection("Managers")
managersCollection.remove({})

managersCollection.insert(
    {
        
    }
)