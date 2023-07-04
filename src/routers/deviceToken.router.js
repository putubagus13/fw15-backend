const deviceToken = require("express").Router()
const deviceTokenController = require("../controllers/device.controller")

deviceToken.post("/", deviceTokenController.saveToken)

module.exports = deviceToken
