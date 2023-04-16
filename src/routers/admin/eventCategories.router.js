const eventCategoryRouter = require("express").Router()

const categoriesController = require("../../controllers/admin/eventCategories.contoller")
const validation = require("../../middlewares/validator.middlewere")

eventCategoryRouter.get("/",validation("getAllEventCategories"), categoriesController.getAllEventCategory)
eventCategoryRouter.post("/", validation("createEventCategories"), categoriesController.createEventCategory)
eventCategoryRouter.patch("/:id", validation("updateEventCategories"), categoriesController.updateEventCategory)
eventCategoryRouter.delete("/:id", validation("deleteEventCategories"), categoriesController.deleteEventCategory)

module.exports = eventCategoryRouter
