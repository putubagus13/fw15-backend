const historyRouter = require("express").Router()
const reservationController = require("../controllers/reservation.controller")

historyRouter.get("/detail", reservationController.getReservationDetail)

module.exports = historyRouter
