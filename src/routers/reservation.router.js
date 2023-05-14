const reservationRouter = require("express").Router()
const reservationController = require("../controllers/reservation.controller")

reservationRouter.post("/", reservationController.createReservation)
reservationRouter.get("/", reservationController.getAllReservation)
reservationRouter.get("/section", reservationController.getAllSection)

module.exports = reservationRouter
