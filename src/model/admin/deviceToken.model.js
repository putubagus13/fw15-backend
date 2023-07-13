const db = require("../../helpers/db.helper")
const table = "deviceToken"

exports.insertToken = async function(id, data){
    const query = `
    INSERT INTO "${table}" ("token", "userId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.token, id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findAll = async function(page, limit, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "${table}" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset]
    const {rows} = await db.query(query,values)
    return rows
}

exports.findOne = async function(token){
    const query =`
    SELECT * FROM "${table}" WHERE token=$1`

    const values = [token]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.update = async function(token, id){
    const query = `
    UPDATE "${table}" 
    SET 
    "userId"= COALESCE(NULLIF($2::INTEGER, NULL), "userId")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [token, id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 
