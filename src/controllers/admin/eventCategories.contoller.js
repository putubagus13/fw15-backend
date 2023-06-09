const eventCategoryModel = require("../../model/admin/eventCategories.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllEventCategory = async (request,response)=>{
    try {
        const data = await eventCategoryModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all event category",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createEventCategory = async (request, response)=>{
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
        const event = await eventCategoryModel.insert(data)
        if(!event){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create event category successfuly",
            result: event
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateEventCategory = async (request, response)=>{
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
        const event = await eventCategoryModel.update(request.params.id, data)
        if(!event){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update event category Success!",
            results: event
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteEventCategory = async (request,response)=>{
    try {
        const data = await eventCategoryModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete event category successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
   
}

exports.getOne = async (request,response)=>{
    try {
        const data = await eventCategoryModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail users",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
}


