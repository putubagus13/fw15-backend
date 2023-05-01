const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")

eventRouter.post("/:id", uploadMiddleware("picture"), validation("createEvent"), eventController.updateEvent)
eventRouter.get("/detail", eventController.getEvent)
eventRouter.get("/", eventController.getAllEvent)

module.exports = eventRouter
