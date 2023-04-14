const userRouter = require("express").Router()

const usersController = require("../../controllers/users.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

userRouter.get("/", usersController.getAllUsers)
userRouter.get("/:id", usersController.getOneUser)
userRouter.post("/", validation("ceateUser"), usersController.createUser )
userRouter.patch("/:id", validation("upadateUser"), usersController.updateUser)
userRouter.delete("/:id", usersController.deleteUser)

module.exports = userRouter
