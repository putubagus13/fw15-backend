const citiesRouter = require("express").Router()

const citiesController = require("../../controllers/admin/cities.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

citiesRouter.get("/", validation("getAllCities"), citiesController.getAllCities)
citiesRouter.post("/",  uploadMiddleware("picture"),validation("createCities"), citiesController.createCities)
citiesRouter.patch("/:id", uploadMiddleware("picture"),validation("updateCities"), citiesController.updateCities)
citiesRouter.delete("/:id", validation("deleteCities"), citiesController.deleteCities)

module.exports = citiesRouter
