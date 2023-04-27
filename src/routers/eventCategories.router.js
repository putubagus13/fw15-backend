const eventCategoriesRouter = require("express").Router()
const eventCategoriesController = require("../controllers/eventCategories.controller")

eventCategoriesRouter.get("/:id", eventCategoriesController.getEventCategories)

module.exports = eventCategoriesRouter
