const eventModel = require("../model/admin/event.model")
const errorHandler = require("../helpers/errorHandler")
const fileRemover = require("../helpers/fileRemover.helpers")

exports.updateEvent = async (request, response) => {
    try {
        const {id} = request.user
        const event = await eventModel.findOneByCityId(id)
        const data = {
            ...request.body
        }
        if(request.file){
            if(event.picture){
                fileRemover({filename: event.picture})
            }
            data.picture =  request.file.filename
        }
        const eventData = await eventModel.updateByCityId(id, data)
        if(!eventData){
            throw Error ("profile_update_failed")
        }
        return response.json({
            success: true,
            message: "Event success edited",
            result: event
        }) 
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getEvent = async (request, response) => {
    try {
        const {id} = request.user
        const event = await eventModel.findOneByCityId(id)
        if(!event){
            throw Error("profile_not_found")
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
