const db = require("../../helpers/db.helper")

const tabel = "eventCategories"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "${tabel}" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("eventId", "categoryId")
    VALUES ($1, $2) RETURNING *
    `
    const values = [data.eventId, data.categoryId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "categoryId"= COALESCE(NULLIF($3::INTEGER, NULL), "categoryId")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.eventId, data.categoryId]
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

exports.findOne = async function(id){
    const query =`
    SELECT * FROM "${tabel}" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByIdParams = async function(id){
    const query =`
    SELECT
    "e"."id",
    "e"."title",
    "ci"."name" as "location",
    STRING_AGG("c"."name", ', ') as "category",
    "e"."desciption",
    "e"."date",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "categories" "c" ON "c"."id" = "ec"."categoryId"
    JOIN "cities" "ci" ON "ci"."id" = "e"."cityId"
    GROUP BY "e"."id", "ci"."name"`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
