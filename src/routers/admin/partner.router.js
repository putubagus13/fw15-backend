const partnerRouter = require("express").Router()

const partnerController = require("../../controllers/admin/partners.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

partnerRouter.get("/", validation("getAllPartners"), partnerController.getAllPartner)
partnerRouter.get("/:id", validation("getDetail"), partnerController.getOne)
partnerRouter.post("/", uploadMiddleware("picture"), validation("createPartners"), partnerController.createPartner)
partnerRouter.patch("/:id", uploadMiddleware("picture"), validation("updatePartners"), partnerController.updatePartner)
partnerRouter.delete("/:id", validation("deletePartners"), partnerController.deletePartner)

module.exports = partnerRouter
