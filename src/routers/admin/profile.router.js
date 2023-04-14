const profileRouter = require("express").Router()

const profileController = require("../../controllers/admin/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
// const validation = require("../../middlewares/validator.middlewere")

profileRouter.get("/", profileController.getAllProfile)
profileRouter.post("/", uploadMiddleware("picture"), profileController.createProfile )
profileRouter.patch("/:id", uploadMiddleware("picture"), profileController.updateProfile)
profileRouter.delete("/:id", profileController.deleteProfile)

module.exports = profileRouter
