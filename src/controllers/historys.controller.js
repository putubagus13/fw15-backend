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
        const {id} = request.user.id
        const data = await reservationModel.findAllHistory(
            request.query.page, 
            request.query.limit, 
            request.query.sort, 
            request.query.sortBy, id)

        return response.json({
            success: true,
            massage: "List of all reservation Booking",
            results: data
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

