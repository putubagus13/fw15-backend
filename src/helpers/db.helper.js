const {Pool} = require("pg")

const db = new Pool({
    connectionString: process.env.DATABASE
})

db.connect().then(() =>{
    console.log("Database connectd")
}).catch(() =>{
    console.log("failed")
})

module.exports = db
