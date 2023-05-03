const wishListRouter = require("express").Router()
const wishListController = require("../controllers/wishlist.controller")
const validation = require("../middlewares/validator.middlewere")

wishListRouter.post("/", validation("createWishList"), wishListController.createWishList)
wishListRouter.get("/:id", wishListController.getDetailWishlist)
wishListRouter.delete("/:id", wishListController.deleteWishList)

module.exports = wishListRouter
