const db = require("../helpers/db.helper")

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "users" WHERE "name" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query,values)
    return rows
}

exports.findOne = async function(id){
    const query =`
    SELECT * FROM "users" WHERE id=$1`
  
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "users" ("email", "password", "name")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.email, data.password, data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "users" 
    SET "email"=$2, 
    "password"=$3 WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.email, data.password]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "users" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 


