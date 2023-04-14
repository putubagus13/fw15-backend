const paymentMethodRouter = require("express").Router()

const paymentMethodController = require("../../controllers/admin/paymentMethod.controller")

paymentMethodRouter.get("/", paymentMethodController.getAllPayment)
paymentMethodRouter.post("/", paymentMethodController.createPayment)
paymentMethodRouter.patch("/:id", paymentMethodController.updatePayment)
paymentMethodRouter.delete("/:id", paymentMethodController.deletePayment)

module.exports = paymentMethodRouter
