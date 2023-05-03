const eventCategoriesRouter = require("express").Router()
const eventCategoriesController = require("../controllers/eventCategories.controller")

eventCategoriesRouter.post("/:id", eventCategoriesController.updateEventCategory)

module.exports = eventCategoriesRouter
