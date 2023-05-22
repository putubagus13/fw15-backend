const historyRouter = require("express").Router()
const historyController = require("../controllers/historys.controller")

historyRouter.get("/:id", historyController.getReservationDetail)
historyRouter.get("/", historyController.getAll)

module.exports = historyRouter
