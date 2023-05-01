const db = require("../../helpers/db.helper")

const table = "Historys"

exports.getAll = async (page, limit, sort, sortBy) =>{
    page = parseInt(page)|| 1
    limit = parseInt(limit)|| 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offside = (page-1)*limit
    const query =`
    SELECT * FROM "${table}" ORDER BY ${sort} ${sortBy} LIMIT= $1 OFFSIDE= $2`

    const values = [limit, offside]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async (data) =>{
    const query = `
    INSERT INTO "${table} ("userId", "eventId")
    VALUE ($1, $2) RETURNING* `

    const values = [data.userId, data.eventId]
    const {rows} = await db.query(query, values)
    return rows
}

exports.update = async (id, data) =>{
    const query = `
    UPDATE INTO "${table} SET
    "userId" = COALESCE (NULLIF($2::INTEGER, NULL), "userId"),
    "eventId = COALESCE (NULLIF($3::INTEGER, NULL), "eventId"),
    WHERE "id"= $1 RETURNING*`

    const values = [id, data.userId, data.eventId]
    const {rows} = await db.query(query, values)
    return rows
}

exports.destroy = async (id) =>{
    const query = `
    DELETE FROM "${table}" WHERE "id"= $1 RETURNING*`

    const values = [id]
    const {rows} = db.query(query,values)
    return rows
}

exports.findOne = async (id) =>{
    const query = `
    SELECT *FROM "${table}" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows

}

exports.updateByUserId = async(userId, data) =>{
    const query = `
    UPDATE INTO "${table}" SET
    "userId" = COALESCE(NULLIF ($2::INTEGER, NULL), "userId"),
    "eventId = COALESCE(NULLIF ($3::INTEGER, NULL), "eventId)
    WHERE "userId"= $1 RETURNING*`

    const values = [userId, data.userId, data.eventId]
    const {rows} = await db.query(query, values)
    return rows
}

exports.findByUserId = async function(userId){
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
