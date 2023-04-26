const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")
const argon = require("argon2")

exports.createResReservation = async (request, response)=>{
    try{
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }

        if(request.file){
            data.picture = request.file.filename
        }
        const reservation = await reservationModel.insert(data)
        if(!reservation){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create reservation successfuly",
            result: reservation
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

