console.log(process.env.ATLAS_URI);
db.createUser(
    { 
        user: "qrway_admin",
        pwd:  "qrway_password",
        roles: [
            { role: "dbAdmin", db:"qrway_db"},
        ] 
    } 
 );