const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")

authRouter.post("/login",authController.login)
authRouter.post("/register",authController.register)
authRouter.patch("/update",authController.update)

module.exports = authRouter
