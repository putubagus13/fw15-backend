const citiesRouter = require("express").Router()
const citiesController = require("../controllers/cities.controller")
// const validation = require("../middlewares/validator.middlewere")

citiesRouter.get("/", citiesController.getAllCities)

module.exports = citiesRouter
