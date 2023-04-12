const userRouter = require("express").Router()

const usersController = require("../controllers/users.controller")
const uploadMiddleware = require("../middlewares/upload.middleware")
const validation = require("../middlewares/validator.middlewere")

userRouter.get("/",validation("allUsers"), usersController.getAllUsers)
userRouter.get("/:id", usersController.getOneUser)
userRouter.post("/", uploadMiddleware("picture"), validation("ceateUser"), usersController.createUser )
userRouter.patch("/:id",uploadMiddleware("picture"), validation("ceateUser"), usersController.updateUser)
userRouter.delete("/:id", usersController.deleteUser)

module.exports = userRouter
