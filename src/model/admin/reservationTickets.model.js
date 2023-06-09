const db = require("../../helpers/db.helper")

const table = "reservationTickets"

exports.findAll = async function(page, limit, search, sort, sortBy){
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

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" ("resevationId", "sectionId", "quantity")
    VALUES ($1, $2, $3) RETURNING *
    `
    const values = [data.resevationId, data.sectionId, data.quantity]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "resevationId"= COALESCE(NULLIF($2::INTEGER, NULL), "resevationId"),
    "sectionId"= COALESCE(NULLIF($3::INTEGER, NULL), "sectionId"),
    "quantity"= COALESCE(NULLIF($4::INTEGER, NULL), "quantity")
     WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.resevationId, data.sectionId, data.quantity]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${table}" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findOne = async function(id){
    const query =`
    SELECT * FROM "${table}" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByReservationId = async function(resevationId){
    const query =`
    SELECT * FROM "${table}" WHERE "resevationId"=$1`

    const values = [resevationId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
