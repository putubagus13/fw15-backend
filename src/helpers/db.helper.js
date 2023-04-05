const {Pool} = require("pg")

const db = new Pool({
    connectionString: "postgres://postgres:1@127.0.0.1:5432/postgres?schema=public"
})

db.connect().then(() =>{
    console.log("Database connectd")
}).catch(() =>{
    console.log("failed")
})

module.exports = db
