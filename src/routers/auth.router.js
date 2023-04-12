const authRouter = require("express").Router()

const authController = require("../controllers/auth.controller")
const validation = require("../middlewares/validator.middlewere")

authRouter.post("/login", validation("authLogin"), authController.login)
authRouter.post("/register", validation("ceateUser") ,authController.register)

module.exports = authRouter
