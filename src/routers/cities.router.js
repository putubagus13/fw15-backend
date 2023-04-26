const citiesRouter = require("express").Router()
const citiesController = require("../controllers/cities.controller")
const validation = require("../middlewares/validator.middlewere")

citiesRouter.get("/",validation("getAllCities"), citiesController.getAllCities)

module.exports = citiesRouter
