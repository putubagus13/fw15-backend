const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")
const authMiddleweres = require("../middlewares/auth.middlewere")

eventRouter.get("/", eventController.getAllEvent)
eventRouter.post("/",authMiddleweres, uploadMiddleware("picture"),validation("createEvent"), eventController.addEvent)
eventRouter.patch("/:id",authMiddleweres, uploadMiddleware("picture"), eventController.updateEvent)
eventRouter.get("/manage", authMiddleweres, eventController.getEventManage)
eventRouter.get("/detail/:id", eventController.getEvent)
eventRouter.delete("/manage/:id", eventController.deleteEvent)
eventRouter.get("/manage/detail/:id",authMiddleweres, eventController.getEventDetail)


module.exports = eventRouter
