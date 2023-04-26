const db = require("../../helpers/db.helper")

exports.update = async function(id, data){
    const query = `
    UPDATE "users" 
    SET 
    "password"= COALESCE(NULLIF($2,''), "password")
    WHERE "id"=$1
    RETURNING *
  `
    const values = [id, data.password]
    const {rows} = await db.query(query, values)
    return rows[0]
} 


exports.findOneUserId = async function(id){
    const query =`
    SELECT * FROM "users" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
