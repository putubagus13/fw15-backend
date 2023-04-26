const db = require("../../helpers/db.helper")

const tabel = "events"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "${tabel}" WHERE "title" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("picture", "title", "date", "cityId", "desciption")
    VALUES ($1, $2, $3, $4, $5) RETURNING *
    `
    const values = [data.picture, data.title, data.date, data.cityId, data.desciption]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "picture"= COALESCE(NULLIF($2,''), "picture"),
    "title"= COALESCE(NULLIF($3,''), "title"),
    "date"= COALESCE(NULLIF($4::DATE, NULL), "date"),
    "cityId"= COALESCE(NULLIF($5::INTEGER, NULL), "cityId"),
    "desciption"= COALESCE(NULLIF($6,''), "desciption")
     WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.picture, data.title, data.date, data.cityId, data.desciption]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.updateByCityId = async function(cityId, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "picture"= COALESCE(NULLIF($2,''), "picture"),
    "title"= COALESCE(NULLIF($3,''), "title"),
    "date"= COALESCE(NULLIF($4::DATE, NULL), "date"),
    "desciption"= COALESCE(NULLIF($5,''), "desciption")
    WHERE "cityId"=$1
    RETURNING *
    `
    const values = [cityId, data.picture, data.title, data.date, data.desciption]
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

exports.findOneByCityId = async function(cityId){
    const query =`
    SELECT  
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    WHERE "e"."cityId"=$1`

    const values = [cityId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
