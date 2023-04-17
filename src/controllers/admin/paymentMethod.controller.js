const paymentMethodModel = require("../../models/paymentMethod.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

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
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }

        if(request.file){
            data.picture = request.file.filename
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

exports.updatePayment = async (request, response)=>{
    try {
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const payment = await paymentMethodModel.update(request.params.id, data)
        if(!payment){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update payment method payment Success!",
            results: payment
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deletePayment = async (request,response)=>{
    try {
        const data = await paymentMethodModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete payment method payment successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await paymentMethodModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail payment method",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
  
}
