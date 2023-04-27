const router = require("express").Router()
const authMiddleweres = require("../middlewares/auth.middlewere")

router.get("/", (request, response)=>{
    return response.json({
        success: true,
        massage: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/admin",authMiddleweres, require("../routers/admin.router"))
router.use("/profile", authMiddleweres, require("../routers/profile.router"))
router.use("/event", authMiddleweres, require("../routers/event.router"))
router.use("/categories", authMiddleweres, require("../routers/categories.router"))
router.use("/cities", authMiddleweres, require("../routers/cities.router"))
router.use("/payment", authMiddleweres, require("../routers/payment.router"))
router.use("/partners", authMiddleweres, require("../routers/partners.router"))
router.use("/reservation", authMiddleweres, require("../routers/reservation.router"))
router.use("/changePassword", authMiddleweres, require("../routers/changePassword.router"))
router.use("/eventCategories", authMiddleweres, require("../routers/eventCategories.router"))
router.use("/wishList", authMiddleweres, require("../routers/wishList.router"))


router.use("*", (request,response)=>{
    return response.status(404).json({
        success: false,
        massage: "Resorce not found"
    })
})

module.exports = router
 