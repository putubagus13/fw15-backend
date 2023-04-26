const changePassword = require("express").Router()
const changePasswordController = require("../controllers/changePassword.controller")
const validation = require("../middlewares/validator.middlewere")

changePassword.patch("/", validation("upadateUser"), changePasswordController.changePassword)

module.exports = changePassword
