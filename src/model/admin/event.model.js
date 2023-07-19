const db = require("../../helpers/db.helper")

const tabel = "events"

exports.findAll = async function(page, limit, search, category, location, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    search = search || ""
    category = category || ""
    location = location || ""
    sort = sort || "id"
    sortBy = sortBy || "DESC"
    const offset = (page -1)* limit

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM ${tabel}
    WHERE "title" LIKE $1`

    const countvalues = [`%${search}%`]
    const { rows: countRows } = await db.query(countQuery, countvalues)

    const query= `
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."date",
    "c"."name" as "location",
    "ct"."name" as "category",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
    JOIN "categories" "ct" ON "ct"."id" = "ec"."categoryId"
    WHERE "e"."title" ILIKE $1
    AND "ct"."name" ILIKE $2
    AND "c"."name" ILIKE $3
    ORDER BY ${sort} ${sortBy} 
    LIMIT $4 OFFSET $5`

    const values = [`%${search}%`, `%${category}%`, `%${location}%`, limit, offset]
    const { rows } = await db.query(query, values)
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: page,
            limit: limit,
            totalPage: Math.ceil(countRows[0].count / limit),
        },
    }
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("picture", "title", "date", "cityId", "desciption")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.picture, data.title, data.date, data.cityId, data.desciption]
    const {rows} = await db.query(query, values)
    return rows[0] 
} 

exports.addEvent = async function(data){
    const query = `
    INSERT INTO "${tabel}" ("picture", "title", "date", "cityId", "desciption", "createdBy")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.picture, data.title, data.date, data.cityId, data.desciption, data.createdBy]
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

exports.updateData = async function(id, createdBy, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "picture"= COALESCE(NULLIF($3,''), "picture"),
    "title"= COALESCE(NULLIF($4,''), "title"),
    "date"= COALESCE(NULLIF($5::DATE, NULL), "date"),
    "cityId"= COALESCE(NULLIF($6::INTEGER, NULL), "cityId"),
    "desciption"= COALESCE(NULLIF($7,''), "desciption")
    WHERE "id"=$1 AND "createdBy"=$2
    RETURNING *
    `
    const values = [id, createdBy, data.picture, data.title, data.date, data.cityId, data.desciption]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.updateById = async function(id, data){
    const query = `
    UPDATE "${tabel}" 
    SET 
    "picture"= COALESCE(NULLIF($2,''), "picture"),
    "title"= COALESCE(NULLIF($3,''), "title"),
    "date"= COALESCE(NULLIF($4::DATE, NULL), "date"),
    "cityId"= COALESCE(NULLIF($5::INTEGER, NULL), "cityId"),
    "desciption"= COALESCE(NULLIF($6,''), "desciption")
    WHERE id=$1
    RETURNING *
    `
    const values = [id, data.picture, data.title, data.date, data.cityId, data.desciption]
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
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."date",
    "c"."name" as "location",
    "ct"."name" as "category",
    "w"."eventId",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
    JOIN "categories" "ct" ON "ct"."id" = "ec"."categoryId"
    LEFT JOIN "wishList" "w" ON "w"."eventId" = "e"."id"
    WHERE "e"."id"=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findManage = async function(createdBy, page, limit, search, category, location, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    search = search || ""
    category = category || ""
    location = location || ""
    sort = sort || "id"
    sortBy = sortBy || "DESC"
    const offset = (page -1)* limit

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM ${tabel}
    WHERE "title" ILIKE $1`

    const countvalues = [`%${search}%`]
    const { rows: countRows } = await db.query(countQuery, countvalues)

    const query =`
    SELECT  
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."date",
    "c"."name" as "location",
    "ct"."name" as "category",
    "w"."eventId",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
    JOIN "categories" "ct" ON "ct"."id" = "ec"."categoryId" 
    LEFT JOIN "wishList" "w" ON "w"."eventId" = "e"."id"
    WHERE "e"."title" ILIKE $1
    AND "e"."createdBy"=$2
    ORDER BY ${sort} ${sortBy} 
    LIMIT $3 OFFSET $4`
    
    const values = [`%${search}%`, createdBy, limit, offset]
    const { rows } = await db.query(query, values)
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: page,
            limit: limit,
            totalPage: Math.ceil(countRows[0].count / limit),
        },
    }
}

exports.findOneByUserId = async function(id, createdBy){
    const query =`
    SELECT  
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."desciption",
    "e"."date",
    "c"."name" as "location",
    "ct"."name" as "category",
    "e"."createdAt",
    "e"."updatedAt"
    FROM "${tabel}" "e"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "eventCategories" "ec" ON "ec"."eventId" = "e"."id"
    JOIN "categories" "ct" ON "ct"."id" = "ec"."categoryId"
    WHERE "e"."id"=$1 AND "createdBy"=$2`

    const values = [id, createdBy]
    const {rows} = await db.query(query, values)
    return rows[0]
}
