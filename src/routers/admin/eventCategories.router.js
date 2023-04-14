const eventCategoryouter = require("express").Router()

const categoriesController = require("../../controllers/admin/eventCategories.contoller")

eventCategoryouter.get("/", categoriesController.getAllEventCategory)
eventCategoryouter.post("/", categoriesController.createEventCategory)
eventCategoryouter.patch("/:id", categoriesController.updateEventCategory)
eventCategoryouter.delete("/:id", categoriesController.deleteEventCategory)

module.exports = eventCategoryouter
