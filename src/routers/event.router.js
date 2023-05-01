const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")

eventRouter.post("/", uploadMiddleware("picture"),validation("createEvent"), eventController.addEvent)
eventRouter.post("/:id", uploadMiddleware("picture"), validation("updateEvent"), eventController.updateEvent)
eventRouter.get("/detail", eventController.getEvent)
eventRouter.get("/",validation("getAllEvent"), eventController.getAllEvent)

module.exports = eventRouter
