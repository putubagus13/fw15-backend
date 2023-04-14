const partnerRouter = require("express").Router()

const partnerController = require("../../controllers/admin/partners.controller")
const uploadMiddleware = require("../../middlewares/upload.middleware")

partnerRouter.get("/", partnerController.getAllPartner)
partnerRouter.post("/",  uploadMiddleware("picture"), partnerController.createPartner)
partnerRouter.patch("/:id", uploadMiddleware("picture"), partnerController.updatePartner)
partnerRouter.delete("/:id", partnerController.deletePartner)

module.exports = partnerRouter
