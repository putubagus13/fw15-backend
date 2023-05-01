const wishListRouter = require("express").Router()
const wishListController = require("../controllers/wishlist.controller")
const validation = require("../middlewares/validator.middlewere")

wishListRouter.post("/", validation("createWishList"), wishListController.updateWishlist)
wishListRouter.get("/", wishListController.getAll)
wishListRouter.get("/detail", wishListController.getByUserId)
wishListRouter.delete("/", wishListController.deleteWishList)

module.exports = wishListRouter
