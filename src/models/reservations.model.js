const db = require("../helpers/db.helper")

const tabel = "reservations"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "${tabel}" WHERE "status" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("eventId", "userId", "status", "paymentMethodId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [data.eventId, data.userId, data.status, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "userId"= COALESCE(NULLIF($3::INTEGER, NULL), "userId"),
    "status"= COALESCE(NULLIF($4, ''), "status"),
    "paymentMethodId"= COALESCE(NULLIF($5::INTEGER, NULL), "paymentMethodId")
     WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.eventId, data.userId, data.status, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${tabel}" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 
