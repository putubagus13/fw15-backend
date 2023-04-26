const partnersRouter = require("express").Router()
const partnersController = require("../controllers/partners.controller")
const validation = require("../middlewares/validator.middlewere")

partnersRouter.get("/",validation("getAllPartners"), partnersController.getAllPartners)

module.exports = partnersRouter
