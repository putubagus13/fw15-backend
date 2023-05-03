const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")

eventRouter.post("/", uploadMiddleware("picture"),validation("createEvent"), eventController.addEvent)
eventRouter.patch("/:id", uploadMiddleware("picture"), validation("updateEvent"), eventController.updateEvent)
eventRouter.get("/manage", eventController.getEventManage)
eventRouter.get("/manage/detail/:id", eventController.getEventDetail)
eventRouter.get("/",validation("getAllEvent"), eventController.getAllEvent)
eventRouter.get("/detail/:id", eventController.getEvent)


module.exports = eventRouter
