const paymentMethodRouter = require("express").Router()
const paymentMethodController = require("../controllers/payment.controller")
const validation = require("../middlewares/validator.middlewere")

paymentMethodRouter.post("/", validation("getAllPayment"), paymentMethodController.createPayment)
paymentMethodRouter.get("/:id", paymentMethodController.getOne)
paymentMethodRouter.get("/", paymentMethodController.getAll)

module.exports = paymentMethodRouter
