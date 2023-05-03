const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")
const paymentMethodModel = require("../model/admin/paymentMethod.model")

exports.createPayment = async (request, response)=>{
    try {
        const paymentMethod = await paymentMethodModel.findOne(request.body.paymentMethodId)
        if(!paymentMethod){
            throw Error("Payment method not found")
        }
        const data = {
            ...request.body
        }
    
        const payment = await reservationModel.update(request.body.reservationId, data)
        if(!payment){
            return Error("update_failed")
        }

        return response.json({
            success: true,
            message: "Payment request Success!",
            results: payment
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}
