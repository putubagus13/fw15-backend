const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")
const paymentMethodModel = require("../model/admin/paymentMethod.model")
const eventsModel = require("../model/admin/event.model")
const reservationTicketModel = require("../model/admin/reservationTickets.model")

exports.createPayment = async (request, response)=>{
    try {
        const paymentMethod = await paymentMethodModel.findOne(request.body.paymentMethodId)
        if(!paymentMethod){
            throw Error("Payment method not found")
        }
        const data = {
            ...request.body,
            status: 4
        }
    
        const payment = await reservationModel.update(request.body.reservationId, data)
        if(!payment){
            return Error("update_failed")
        }

        return response.json({
            success: true,
            message: "Payment request Success!",
            results: {
                id: payment.id,
                events: await eventsModel.findOne(payment.eventId),
                status: payment.status,
                paymentMethode: payment.paymentMethodId
            }
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.getOne = async(request, response) =>{
    try {
        const reservation = await reservationModel.findOne(request.params.id)
        const rsvTicket = await reservationTicketModel.findOneByReservationId(reservation.id)
        return response.json({
            success: true,
            message: "Get reservation Success!",
            results: {
                id: reservation.id,
                event: reservation.title,
                sectionName: reservation.section,
                quantity: reservation.price,
                pricePerTicket: reservation.price,
                totalPrice: parseInt(rsvTicket.quantity)* reservation.price
            }
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.getAll = async (request, response)=>{
    try {
        const data = await paymentMethodModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.category,
            request.query.location, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all payment methode",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}
