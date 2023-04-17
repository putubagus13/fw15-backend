const reservationStatusRouter = require("express").Router()

const reservationStatusController = require("../../controllers/admin/reservationStatus.controller")
const validation = require("../../middlewares/validator.middlewere")

reservationStatusRouter.get("/", validation("getAllReservationStatus"), reservationStatusController.getAllStatus)
reservationStatusRouter.get("/:id", validation("getDetail"), reservationStatusController.getOne)
reservationStatusRouter.post("/", validation("createReservationStatus"), reservationStatusController.createStatus)
reservationStatusRouter.patch("/:id", validation("updateReservationStatus"), reservationStatusController.updateStatus)
reservationStatusRouter.delete("/:id", validation("deleteReservationStatus"), reservationStatusController.deleteStatus)

module.exports = reservationStatusRouter
