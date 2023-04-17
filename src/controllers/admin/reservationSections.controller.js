const reservatonSectionModel = require("../../models/reservationSections.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllResSection = async (request,response)=>{
    try {
        const data = await reservatonSectionModel.findAll(
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

exports.createResSection = async (request, response)=>{
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
        const reservation = await reservatonSectionModel.insert(data)
        if(!reservation){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create reservation section successfuly",
            result: reservation
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateResSection = async (request, response)=>{
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
        const reservation = await reservatonSectionModel.update(request.params.id, data)
        if(!reservation){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update reservation section Success!",
            results: reservation
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteResSection = async (request,response)=>{
    try {
        const data = await reservatonSectionModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete reservation section successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOneUser = async (request,response)=>{
    try {
        const data = await reservatonSectionModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail reservation section",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}
