const reservationSectionsRouter = require("express").Router()

const reservationSectionsController = require("../../controllers/admin/reservationSections.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")

reservationSectionsRouter.get("/", reservationSectionsController.getAllResSection)
reservationSectionsRouter.post("/", reservationSectionsController.createResSection)
reservationSectionsRouter.patch("/:id", reservationSectionsController.updateResSection)
reservationSectionsRouter.delete("/:id", reservationSectionsController.deleteResSection)

module.exports = reservationSectionsRouter
