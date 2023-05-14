const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")
//const reservationStatusModel = require("../model/admin/reservationStatus.model")
const eventModel = require("../model/admin/event.model")
//const paymentMethodModel = require("../model/admin/paymentMethod.model")
const reservationSectionModel = require("../model/admin/reservationSections.model")
const reservationTicketModel = require("../model/admin/reservationTickets.model")

exports.getAllReservation = async (request,response)=>{
    try {
        const data = await reservationModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all reservation",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getAllSection = async (request,response)=>{
    try {
        const data = await reservationSectionModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all reservation section",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}
exports.createReservation = async (request, response)=>{
    try {
        const {id} = request.user
        const events = await eventModel.findOne(request.body.eventId)
        if(!events){
            throw Error("event_not_found")
        } 
        // const status = await reservationStatusModel.findOne(request.body.status)
        // if(!status){
        //     throw Error("status_not_found")
        // } 
        // const paymentId = await paymentMethodModel.findOne(request.body.paymentMethodId)
        // if(!paymentId){
        //     throw Error("paymentMethod_not_found")
        // } 
        const data = {
            ...request.body,
            userId: id
        }
        const reservation = await reservationModel.insert(data)
        if(!reservation){
            return Error("update_failed")
        }

        const reservationData = {
            ...request.body,
            resevationId: reservation.id
        }

        await reservationTicketModel.insert(reservationData)
        return response.json({
            success: true,
            message: "Update reservation Success!",
            results: reservation
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

