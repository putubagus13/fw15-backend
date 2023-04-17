const reservationSectionsRouter = require("express").Router()

const reservationSectionsController = require("../../controllers/admin/reservationSections.controller")
// const uploadMiddleware = require("../../middlewares/upload.middleware")
const validation = require("../../middlewares/validator.middlewere")

reservationSectionsRouter.get("/", validation("getAllReservationSection"), reservationSectionsController.getAllResSection)
reservationSectionsRouter.get("/:id", validation("getDetail"), reservationSectionsController.getOne)
reservationSectionsRouter.post("/", validation("createReservationSection"), reservationSectionsController.createResSection)
reservationSectionsRouter.patch("/:id", validation("updateReservationSection"), reservationSectionsController.updateResSection)
reservationSectionsRouter.delete("/:id", validation("deleteReservationSection"), reservationSectionsController.deleteResSection)

module.exports = reservationSectionsRouter
