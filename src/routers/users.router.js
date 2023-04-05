const userRouter = require("express").Router()

const usersController = require("../controllers/users.controller")

userRouter.get("/", usersController.getAllUsers)
userRouter.post("/",usersController.createUser )
userRouter.patch("/:id", usersController.updateUser)
userRouter.delete("/:id", usersController.deleteUser)

module.exports = userRouter
