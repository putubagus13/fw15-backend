var admin = require("firebase-admin")

var serviceAccount = require("../../wetix-app-firebase-adminsdk-kh8a0-4cffd22656.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
