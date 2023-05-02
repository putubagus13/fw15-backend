const historyRouter = require("express").Router()
const historyController = require("../controllers/historys.controller")

historyRouter.get("/detail", historyController.getReservationDetail)

module.exports = historyRouter
