const paymentMethodModel = require("../model/admin/paymentMethod.model")
const errorHandler = require("../helpers/errorHandler")

exports.createPayment = async (request, response)=>{
    try{
        const data = {
            ...request.body
        }
        const payment = await paymentMethodModel.insert(data)
        if(!payment){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create payment method successfuly",
            result: payment
        })
    }catch(error){
        return errorHandler(response, error)
    }
}
