require("dotenv").config({
    path: ".env"
})

const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.urlencoded({extended: false}))

app.use(cors({
    origin: "https://tixevent.netlify.app",
    optionalSuccessStatus: 200
}))

app.use("/uploads", express.static("uploads"))

app.use("/", require("./src/routers"))

app.get("/",(request, response)=>{
    return response.json({
        success: true,
        massage: "Backend is running well"
    })
})

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})
