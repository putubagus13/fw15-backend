const router = require("express").Router()
const authMiddleweres = require("../middlewares/auth.middlewere")

router.get("/", (request, response)=>{
    return response.json({
        success: true,
        massage: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/admin",authMiddleweres, require("./admin.router"))


router.use("*", (request,response)=>{
    return response.status(404).json({
        success: false,
        massage: "Resorce not found"
    })
})

module.exports = router
 