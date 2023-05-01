const paymentMethodModel = require("../model/admin/paymentMethod.model")
const errorHandler = require("../helpers/errorHandler")

exports.getAllPayment = async (request,response)=>{
    try {
        const data = await paymentMethodModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all payment method",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

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
