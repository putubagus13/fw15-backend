const profileRouter = require("express").Router()
const uploadMiddleware = require("../middlewares/upload.middleware")
const profileController = require("../controllers/profile.controller")
const validation = require("../middlewares/validator.middlewere")

profileRouter.get("/", profileController.getProfile)
profileRouter.post("/", uploadMiddleware("picture"), validation("createProfile"), profileController.updateProfile)

module.exports = profileRouter
