const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")
const reservationStatusModel = require("../model/admin/reservationStatus.model")
const eventModel = require("../model/admin/event.model")
const paymentMethodModel = require("../model/admin/paymentMethod.model")

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

exports.updateReservation = async (request, response)=>{
    try {
        const {id} = request.user
        const events = await eventModel.findOne(request.body.eventId)
        if(!events){
            throw Error("event_not_found")
        } 
        const status = await reservationStatusModel.findOne(request.body.status)
        if(!status){
            throw Error("status_not_found")
        } 
        const paymentId = await paymentMethodModel.findOne(request.body.paymentMethodId)
        if(!paymentId){
            throw Error("paymentMethod_not_found")
        } 
        const data = {
            ...request.body
        }
        const reservation = await reservationModel.updateByUserId(id, data)
        if(!reservation){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update reservation Success!",
            results: reservation
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.getReservationDetail = async (request, response) => {
    try {
        const {id} = request.user
        const reservation = await reservationModel.findOneByIdUserId(id)
        if(!reservation){
            throw Error("reservation_not_found")
        }
        return response.json({
            success: true,
            message: "Reservation",
            results: reservation
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
