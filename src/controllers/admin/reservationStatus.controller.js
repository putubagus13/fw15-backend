const reservationStatusModel = require("../../models/reservationStatus.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllStatus = async (request,response)=>{
    try {
        const data = await reservationStatusModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all reservation status",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createStatus = async (request, response)=>{
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
        const status = await reservationStatusModel.insert(data)
        if(!status){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create reservation status successfuly",
            result: status
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateStatus = async (request, response)=>{
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
        const status = await reservationStatusModel.update(request.params.id, data)
        if(!status){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update reservation status Success!",
            results: status
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteStatus = async (request,response)=>{
    const data = await reservationStatusModel.destroy(request.params.id)
    if(data){
        return response.json({
            success: true,
            massage: "Delete reservation status successfully",
            results: data
        })
    }
    errorHandler(response, data)
}
