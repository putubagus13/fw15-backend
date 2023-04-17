const wishListRouter = require("express").Router()

const wishListController = require("../../controllers/admin/wishlist.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

wishListRouter.get("/", validation("getAllWishList"), wishListController.getAllWishList)
wishListRouter.get("/:id", validation("getDetail"), wishListController.getOne)
wishListRouter.post("/", validation("createWishList"), wishListController.createWishList)
wishListRouter.patch("/:id", validation("updateWishList"), wishListController.updateWishList)
wishListRouter.delete("/:id", validation("deleteWishList"), wishListController.deleteWishList)

module.exports = wishListRouter
