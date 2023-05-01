const reservationRouter = require("express").Router()
const reservationController = require("../controllers/reservation.controller")

reservationRouter.post("/", reservationController.updateReservation)
reservationRouter.get("/detail", reservationController.getReservationDetail)

module.exports = reservationRouter
