const db = require("../../helpers/db.helper")

const teble = "reservations"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "${teble}" ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function(data){
    const query = `
    INSERT INTO "${teble}" ("eventId", "userId", "status", "paymentMethodId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [data.eventId, data.userId, data.status, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.update = async function(id, data){
    const query = `
    UPDATE "${teble}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "userId"= COALESCE(NULLIF($3::INTEGER, NULL), "userId"),
    "status"= COALESCE(NULLIF($4::INTEGER, NULL), "status"),
    "paymentMethodId"= COALESCE(NULLIF($5::INTEGER, NULL), "paymentMethodId")
     WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.eventId, data.userId, data.status, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.updateByUserId = async function(userId, data){
    const query = `
    UPDATE "${teble}" 
    SET 
    "eventId"= COALESCE(NULLIF($2::INTEGER, NULL), "eventId"),
    "status"= COALESCE(NULLIF($3::INTEGER, NULL), "status"),
    "paymentMethodId"= COALESCE(NULLIF($4::INTEGER, NULL), "paymentMethodId")
    WHERE "userId"=$1
    RETURNING *
    `
    const values = [userId, data.eventId, data.status, data.paymentMethodId]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${teble}" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findOne = async function(id){
    const query =`
    SELECT
    "r"."id",
    "e"."title",
    "rs"."name" as "section",
    "rs"."price",
    "rt"."quantity",
    "r"."createdAt",
    "r"."updatedAt"
    FROM "${teble}" "r"
    JOIN "events" "e" ON "e"."id" = "r"."eventId"
    JOIN "reservationTickets" "rt" ON "rt"."resevationId" = "r"."id"
    JOIN "reservationSections" "rs" ON "rs".id = "rt"."sectionId"
    WHERE "r"."id"=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByIdReservationId = async function(id, userId){
    const query =`
    SELECT
    "r"."id",
    "e"."picture",
    "e"."title",
    "e"."date",
    "rs"."name" as "status",
    "s"."name" as "section",
    "s"."price",
    "rt"."quantity",
    "pm"."name" as "PaymentMetode",
    "r"."createdAt",
    "r"."updatedAt"
    FROM "${teble}" "r"
    JOIN "events" "e" ON "e"."id" = "r"."eventId"
    JOIN "paymentMethod" "pm" ON "pm"."id" = "r"."paymentMethodId"
    JOIN "reservationStatus" "rs" ON "rs"."id" = "r"."status"
    JOIN "reservationTickets" "rt" ON "rt"."resevationId" = "r"."id"
    JOIN "reservationSections" "s" ON "s"."id" = "rt"."sectionId"
    WHERE "r"."id"=$1 AND "r"."userId"=$2`

    const values = [id, userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findAllHistory = async function(page, limit, sort, sortBy, userId){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT
    "r"."id",
    "e"."picture",
    "e"."title",
    "e"."date",
    "c"."name" as "location",
    "rs"."name" as "status",
    "s"."name" as "section",
    "s"."price",
    "rt"."quantity",
    "pm"."name" as "PaymentMetode",
    "r"."createdAt",
    "r"."updatedAt"
    FROM "${teble}" "r"
    JOIN "events" "e" ON "e"."id" = "r"."eventId"
    JOIN "cities" "c" ON "c"."id" = "e"."cityId"
    JOIN "paymentMethod" "pm" ON "pm"."id" = "r"."paymentMethodId"
    JOIN "reservationStatus" "rs" ON "rs"."id" = "r"."status"
    JOIN "reservationTickets" "rt" ON "rt"."resevationId" = "r"."id"
    JOIN "reservationSections" "s" ON "s"."id" = "rt"."sectionId" 
    WHERE "r"."userId"=$1
    ORDER BY ${sort} ${sortBy} 
    LIMIT $2 OFFSET $3`

    const values = [userId, limit, offset]
    const {rows} = await db.query(query,values)
    return rows
}
