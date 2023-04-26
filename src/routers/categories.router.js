const catogoriesRouter = require("express").Router()
const categoriesController = require("../controllers/categories.controller")
const validation = require("../middlewares/validator.middlewere")

catogoriesRouter.get("/",validation("getAllcategories"), categoriesController.getAllCategories)

module.exports = catogoriesRouter
