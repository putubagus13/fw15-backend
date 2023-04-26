const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")

eventRouter.post("/", uploadMiddleware("picture"), validation("createEvent"), eventController.updateEvent)
eventRouter.get("/", eventController.getEvent)

module.exports = eventRouter
