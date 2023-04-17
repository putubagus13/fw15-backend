const eventModel = require("../../models/event.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllEvent = async (request,response)=>{
    try {
        const data = await eventModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all category",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createEvent = async (request, response)=>{
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
        const event = await eventModel.insert(data)
        if(!event){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create event successfuly",
            result: event
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateEvent = async (request, response)=>{
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
        const event = await eventModel.update(request.params.id, data)
        if(!event){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update event Success!",
            results: event
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteEvent = async (request,response)=>{
    try {
        const data = await eventModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete event successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await eventModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail event",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}
