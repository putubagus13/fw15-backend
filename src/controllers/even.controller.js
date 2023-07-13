const eventModel = require("../model/admin/event.model")
const errorHandler = require("../helpers/errorHandler")
// const fileRemover = require("../helpers/fileRemover.helpers")
const citiesModel = require("../model/admin/cities.model")
const eventCategoriesModel = require("../model/admin/eventCategories.model")
const admin = require("../helpers/firebase")
const deviceTokenModel = require("../model/admin/deviceToken.model")

exports.getAllEvent = async (request,response)=>{
    try {
        const { rows: results, pageInfo } = await eventModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.category,
            request.query.location, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all event",
            pageInfo,
            results
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.addEvent = async (request, response)=>{
    try{
        const {id} = request.user
        const cityId = await citiesModel.findOne(request.body.cityId)
        if(!cityId){
            throw Error("city_not_found")
        }
        console.log(request.body.date)
        const data = {
            ...request.body,
            createdBy: id
        }
        if(request.file){
            data.picture = request.file.path
            // data.picture = request.file.filename
        }
        const listToken = await deviceTokenModel.findAll(1, 1000)
        const message = listToken.map(items => ({
            token: items.token, 
            notification: {
                title: "There is new event!", 
                body: `${request.body.title} will be held at ${request.body.date}`
            }}))

        const messaging = admin.messaging()
        messaging.sendEach(message)
        const event = await eventModel.addEvent(data)
        if(!event){
            return Error("update_failed")
        }

        const eventIdData = {
            ...request.body,
            eventId: event.id
        }
        await eventCategoriesModel.insert(eventIdData)

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
            ...request.body,
            createdBy: request.user.id
        }
        if(request.file){
            data.picture = request.file.path
            // if(events.picture){
            //     fileRemover({filename: events.picture})
            // }
        // data.picture =  request.file.filename
        }
        const eventData = await eventModel.updateData(request.params.id, request.user.id, data)
        if(!eventData){
            throw Error ("event_update_failed")
        }

        return response.json({
            success: true,
            message: "Event success edited",
            result: eventData
        }) 
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getEvent = async (request, response) => {
    try {
        const event = await eventModel.findOne(request.params.id)
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

exports.getEventManage = async (request, response) => {
    try {
        const event = await eventModel.findManage(request.user.id)
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

exports.getEventDetail = async (request, response) => {
    try {
        const event = await eventModel.findOneByUserId(request.params.id, request.user.id)
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

exports.deleteEvent = async (request,response)=>{
    try {
        const data = await eventModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete Event successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }

}
