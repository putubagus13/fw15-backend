const eventRound = require("express").Router()

const eventController = require("../../controllers/admin/event.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")

eventRound.get("/", eventController.getAllEvent)
eventRound.post("/",  uploadMiddleware("picture"), eventController.createEvent)
eventRound.patch("/:id", uploadMiddleware("picture"), eventController.updateEvent)
eventRound.delete("/:id", eventController.deleteEvent)

module.exports = eventRound
