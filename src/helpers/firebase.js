var admin = require("firebase-admin")

var serviceAccount = require("../../wetix-app-firebase-adminsdk-kh8a0-c476a49c1c.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = admin
