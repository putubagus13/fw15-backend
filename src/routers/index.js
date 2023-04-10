const router = require("express").Router()

router.get("/", (request, response)=>{
    return response.json({
        success: true,
        massage: "Backend is running well"
    })
})

router.use("/admin", require("./admin.router"))

router.use("*", (request,response)=>{
    return response.status(404).json({
        success: false,
        massage: "Resorce not found"
    })
})

module.exports = router
 