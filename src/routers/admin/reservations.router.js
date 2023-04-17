const reservationRouter = require("express").Router()

const reservationController = require("../../controllers/admin/reservations.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

reservationRouter.get("/", validation("getAllReservation"), reservationController.getAllReservation)
reservationRouter.get("/:id", validation("getDetail"), reservationController.getOne)
reservationRouter.post("/", validation("createReservation"), reservationController.createResReservation)
reservationRouter.patch("/:id", validation("updateReservation"), reservationController.updateReservation)
reservationRouter.delete("/:id", validation("deleteReservation"), reservationController.deleteReservation)

module.exports = reservationRouter
