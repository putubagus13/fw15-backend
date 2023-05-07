const eventRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const eventController = require("../controllers/even.controller")
const validation = require("../middlewares/validator.middlewere")
const authMiddleweres = require("../middlewares/auth.middlewere")

eventRouter.post("/",authMiddleweres, uploadMiddleware("picture"),validation("createEvent"), eventController.addEvent)
eventRouter.patch("/:id",authMiddleweres, uploadMiddleware("picture"), validation("updateEvent"), eventController.updateEvent)
eventRouter.get("/manage", authMiddleweres, eventController.getEventManage)
eventRouter.get("/manage/detail/:id",authMiddleweres, eventController.getEventDetail)
eventRouter.get("/",validation("getAllEvent"), eventController.getAllEvent)
eventRouter.get("/detail/:id", eventController.getEvent)


module.exports = eventRouter
