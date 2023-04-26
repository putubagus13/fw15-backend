const reservationRouter = require("express").Router()
const reservationController = require("../controllers/reservation.controller")
const validation = require("../middlewares/validator.middlewere")

reservationRouter.post("/", validation("createReservation"), reservationController.createResReservation)

module.exports = reservationRouter
