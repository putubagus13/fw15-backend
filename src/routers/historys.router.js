const historyRouter = require("express").Router()
const historyController = require("../controllers/historys.controller")

historyRouter.get("/:id", historyController.getReservationDetail)

module.exports = historyRouter
