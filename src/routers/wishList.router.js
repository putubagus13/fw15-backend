const wishListRouter = require("express").Router()
const wishListController = require("../controllers/wishlist.controller")
const validation = require("../middlewares/validator.middlewere")

wishListRouter.post("/", validation("createWishList"), wishListController.createWishList)
wishListRouter.delete("/", wishListController.deleteWishList)
wishListRouter.get("/", wishListController.getAll)
wishListRouter.get("/:id", wishListController.getDetailWishlist)

module.exports = wishListRouter
