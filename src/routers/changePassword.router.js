const changePassword = require("express").Router()
const changePasswordController = require("../controllers/changePassword.controller")
const validation = require("../middlewares/validator.middlewere")

changePassword.patch("/", validation("changePassword"), changePasswordController.changePassword)

module.exports = changePassword
