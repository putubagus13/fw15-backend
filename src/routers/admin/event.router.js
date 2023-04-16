const eventRound = require("express").Router()

const eventController = require("../../controllers/admin/event.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

eventRound.get("/", validation("getAllEvent"), eventController.getAllEvent)
eventRound.post("/",  uploadMiddleware("picture"), validation("createEvent"), eventController.createEvent)
eventRound.patch("/:id", uploadMiddleware("picture"), validation("updateEvent"), eventController.updateEvent)
eventRound.delete("/:id", validation("deleteEvent"), eventController.deleteEvent)

module.exports = eventRound
