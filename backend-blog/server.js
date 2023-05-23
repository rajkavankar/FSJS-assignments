import express from "express"
import {config} from "./config/config.js"
import {ConnectDB} from "./config/DB.js";
import postRoutes from "./routes/postRoutes.js";

const app = express()

// Database connection
ConnectDB()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Routes
app.use("/api/posts", postRoutes)
app.post("/", (req,res)=>{
    res.status(200).json({
        success: true,
        message: "Welcome"
    })
})
app.listen(config.PORT, ()=>{
    console.log(`Server is running on ${config.PORT}`)
})