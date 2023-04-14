const reservationStatusRouter = require("express").Router()

const reservationStatusController = require("../../controllers/admin/reservationStatus.controller")

reservationStatusRouter.get("/", reservationStatusController.getAllStatus)
reservationStatusRouter.post("/", reservationStatusController.createStatus)
reservationStatusRouter.patch("/:id", reservationStatusController.updateStatus)
reservationStatusRouter.delete("/:id", reservationStatusController.deleteStatus)

module.exports = reservationStatusRouter
