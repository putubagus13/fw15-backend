const paymentMethodRouter = require("express").Router()
const paymentMethodController = require("../controllers/payment.controller")
const validation = require("../middlewares/validator.middlewere")

paymentMethodRouter.post("/", validation("getAllPayment"), paymentMethodController.createPayment)
paymentMethodRouter.get("/", validation("getAllPayment"), paymentMethodController.getAllPayment)

module.exports = paymentMethodRouter
