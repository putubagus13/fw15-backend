const eventModel = require("../model/admin/event.model")
const errorHandler = require("../helpers/errorHandler")
const fileRemover = require("../helpers/fileRemover.helpers")
const citiesModel = require("../model/admin/cities.model")

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

exports.addEvent = async (request, response)=>{
    try{
        const cityId = await citiesModel.findOne(request.body.cityId)
        if(!cityId){
            throw Error("city_not_found")
        }
        const data = {
            ...request.body
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

exports.updateEvent = async (request, response) => {
    try {
        const events = await eventModel.findOne(request.params.id)
        if(!events){
            throw Error("event_not_found")
        } 
        const data = {
            ...request.body
        }
        if(request.file){
            if(events.picture){
                fileRemover({filename: events.picture})
            }
            data.picture =  request.file.filename
        }
        const eventData = await eventModel.updateById(request.params.id, data)
        if(!eventData){
            throw Error ("event_update_failed")
        }

        return response.json({
            success: true,
            message: "Event success edited",
            result: events
        }) 
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getEvent = async (request, response) => {
    try {
        const {cityId} = request.body
        const event = await eventModel.findOneByCityId(cityId)
        if(!event){
            throw Error("event_not_found")
        }
        return response.json({
            success: true,
            message: "Events",
            results: event
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
