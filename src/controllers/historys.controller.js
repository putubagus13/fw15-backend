const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")

exports.getReservationDetail = async (request, response) => {
    try {
        const {id}= request.user
        const reservation = await reservationModel.findOneByIdReservationId(request.params.id, id)
        if(!reservation){
            throw Error("reservation_not_found")
        }
        return response.json({
            success: true,
            message: "Detail reservation history",
            results: reservation
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}

exports.getAll = async (request, response) =>{
    try {
        const {id} = request.user
        const {rows: results, pageInfo} = await reservationModel.findAllHistory(
            id,
            request.query.page, 
            request.query.limit, 
            request.query.search,
            request.query.category,
            request.query.location, 
            request.query.sort, 
            request.query.sortBy)

        return response.json({
            success: true,
            massage: "List of all reservation Booking",
            pageInfo,
            results
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.deleteHistory = async (request,response)=>{
    try {
        const data = await reservationModel.destroy(request.params.id)
        if(data){
            return response.json({
                success: true,
                massage: "Delete History successfully",
                results: data
            })
        }
    } catch (error) {
        errorHandler(response, error)
    }
  
}
