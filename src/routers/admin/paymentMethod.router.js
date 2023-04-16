const paymentMethodRouter = require("express").Router()

const paymentMethodController = require("../../controllers/admin/paymentMethod.controller")
const validation = require("../../middlewares/validator.middlewere")

paymentMethodRouter.get("/", validation("getAllPayment"), paymentMethodController.getAllPayment)
paymentMethodRouter.post("/", validation("getAllPayment"), paymentMethodController.createPayment)
paymentMethodRouter.patch("/:id", validation("updatePayment"), paymentMethodController.updatePayment)
paymentMethodRouter.delete("/:id", validation("deletePayment"), paymentMethodController.deletePayment)

module.exports = paymentMethodRouter
