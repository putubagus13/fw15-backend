const reservationModel = require("../model/admin/reservations.model")
const errorHandler = require("../helpers/errorHandler")

exports.getReservationDetail = async (request, response) => {
    try {
        console.log(request.params.id)
        const reservation = await reservationModel.findOneByIdReservationId(request.params.id)
        console.log(reservation)
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
