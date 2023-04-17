const profileRouter = require("express").Router()

const profileController = require("../../controllers/admin/profile.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

profileRouter.get("/", validation("getAllProfile"), profileController.getAllProfile)
profileRouter.get("/:id", validation("getDetail"), profileController.getOne)
profileRouter.post("/", uploadMiddleware("picture"), validation("createProfile"), profileController.createProfile )
profileRouter.patch("/:id", uploadMiddleware("picture"), validation("updateProfile"), profileController.updateProfile)
profileRouter.delete("/:id", validation("deleteProfile"), profileController.deleteProfile)

module.exports = profileRouter
