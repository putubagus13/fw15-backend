const historyRouter = require("express").Router()
const historyController = require("../controllers/historys.controller")

historyRouter.get("/", historyController.getAll)
historyRouter.get("/:id", historyController.getReservationDetail)
historyRouter.delete("/:id", historyController.deleteHistory)

module.exports = historyRouter
