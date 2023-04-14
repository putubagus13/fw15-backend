const reservationRouter = require("express").Router()

const reservationController = require("../../controllers/admin/reservations.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationRouter.get("/", reservationController.getAllReservation)
reservationRouter.post("/", reservationController.createResReservation)
reservationRouter.patch("/:id", reservationController.Reservation)
reservationRouter.delete("/:id", reservationController.deleteReservation)

module.exports = reservationRouter
