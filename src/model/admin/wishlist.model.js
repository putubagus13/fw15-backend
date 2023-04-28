const db = require("../../helpers/db.helper")

const table = "wishList"

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
    INSERT INTO "${table}" ("eventId", "userId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.eventId, data.userId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "userId"= COALESCE(NULLIF($3::INTEGER, NULL), "userId")
     WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.eventId, data.userId]
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

exports.updateByUserId = async (userId, data)=>{
    const query = `
    UPDATE "${table}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId")
     WHERE "userId"=$1
    RETURNING *
    `
    const values = [userId, data.eventId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByUserId = async function(userId){
    const query =`
    SELECT  
    "u"."id",
    "u"."username",
    "u"."email",
    "e"."picture",
    "e"."title",
    "e"."date",
    "c"."name" as "location",
    "e"."desciption",
    "w"."createdAt",
    "w"."updatedAt"
    FROM "${table}" "w"
    JOIN "users" "u" ON "u"."id" = "w"."userId"
    JOIN "events" "e" ON "e".id = "w"."eventId"
    JOIN "cities" "c" ON "c".id = "e"."cityId"
    WHERE "w"."userId"=$1`

    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
