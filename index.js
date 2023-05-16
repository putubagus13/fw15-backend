require("dotenv").config({
    path: ".env"
})

const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.urlencoded({extended: false}))

app.use(cors({
    // origin: "https://beautiful-madeleine-29b377.netlify.app",
    origin: "http://localhost:5173",
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
