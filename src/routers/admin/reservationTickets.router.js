const reservationTicketsController = require("../../controllers/admin/reservationTickets.controller")
const reservationTicketsRouter = require("express").Router()
const validation = require("../../middlewares/validator.middlewere")

reservationTicketsRouter.get("/", validation("getAllReservationTicket"), reservationTicketsController.getAllTicket)
reservationTicketsRouter.patch("/:id", validation("createReservationTicket"), reservationTicketsController.updateTicket)
reservationTicketsRouter.post("/", validation("updateReservationTicket"), reservationTicketsController.createTicket)
reservationTicketsRouter.delete("/:id", validation("deleteReservationTicket"), reservationTicketsController.deleteTicket)

module.exports = reservationTicketsRouter
