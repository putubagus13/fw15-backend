const categoriesRouter = require("express").Router()

const categoriesController = require("../../controllers/admin/categories.controller")
const validation = require("../../middlewares/validator.middlewere")

categoriesRouter.get("/",validation("getAllcategories"), categoriesController.getAllCategories)
categoriesRouter.post("/",validation("createCategories"), categoriesController.createCategories)
categoriesRouter.patch("/:id",validation("updateCategories"), categoriesController.updateCategories)
categoriesRouter.delete("/:id",validation("deleteCategories"),categoriesController.deleteCategories)

module.exports = categoriesRouter
