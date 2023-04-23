const reservationModel = require("../../model/admin/reservations.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

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
            massage: "List of all reservation section",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

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
        const data = {
            ...request.body
        }
        if(request.body.password){
            data.password = await argon.hash(request.body.password)
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const reservation = await reservationModel.update(request.params.id, data)
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

exports.deleteReservation = async (request,response)=>{
    try {
        const data = await reservationModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete reservationsuccessfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)  
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await reservationModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail of category",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
  
}
