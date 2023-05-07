const db = require("../../helpers/db.helper")

const tabel = "categories"

exports.findAll = async function(page, limit, search, location, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    location = location || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT 
    "ct"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."date",
    "c"."name" as "location",
    "ct"."name" as "category",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "categories" "ct"
    JOIN "eventCategories" "ec" ON "ec"."categoryId" = "ct"."id"
    JOIN "events" "e" ON "ec"."eventId" = "e"."id"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "ct"."name" LIKE $1
    AND "c"."name" LIKE $2
    ORDER BY ${sort} ${sortBy} 
    LIMIT $3 OFFSET $4`

    const values = [`%${search}%`, `%${location}%`, limit, offset]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("name")
    VALUES ($1) RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "name"= $2 WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.name]
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
