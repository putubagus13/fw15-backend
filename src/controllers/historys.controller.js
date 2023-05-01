const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")

exports.getReservationDetail = async (request, response) => {
    try {
        const reservation = await reservationModel.findOneByIdUserId(request.user)
        if(!reservation){
            throw Error("reservation_not_found")
        }
        return response.json({
            success: true,
            message: "Reservation",
            results: reservation
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}
