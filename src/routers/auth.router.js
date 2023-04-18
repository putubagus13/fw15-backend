const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")
const validation = require("../middlewares/validator.middlewere")

authRouter.post("/login", validation("authLogin"), authController.login)
authRouter.post("/register", validation("ceateUser") ,authController.register)
authRouter.post("/forgotRequest",validation("authForgot"), authController.forgotRequest)
authRouter.post("/resetPassword", validation("resetPassword") ,authController.resetPassword)

module.exports = authRouter
