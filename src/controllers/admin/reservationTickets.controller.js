const reservationTicketModel = require("../../model/admin/reservationTickets.model")
const errorHandler = require("../../helpers/errorHandler")
const argon = require("argon2")

exports.getAllTicket = async (request,response)=>{
    try {
        const data = await reservationTicketModel.findAll(
            request.query.page, 
            request.query.limit, 
            request.query.search, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all reservation ticket section",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.createTicket = async (request, response)=>{
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
        const ticket = await reservationTicketModel.insert(data)
        if(!ticket){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            masssage: "create reservation ticket successfuly",
            result: ticket
        })
    }catch(error){
        return errorHandler(response, error)
    }
}

exports.updateTicket = async (request, response)=>{
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
        const ticket = await reservationTicketModel.update(request.params.id, data)
        if(!ticket){
            return Error("update_failed")
        }
        return response.json({
            success: true,
            message: "Update reservation ticket Success!",
            results: ticket
        })
    } catch (error) {
        return errorHandler(response,error)
    }
}

exports.deleteTicket = async (request,response)=>{
    try {
        const data = await reservationTicketModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete reservation ticket successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
    
}

exports.getOne = async (request,response)=>{
    try {
        const data = await reservationTicketModel.findOne(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Detail reservation ticket",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
  
}
