import express from "express"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import { errorHandler } from "./middlewares/error.middleware.js"
const app = express()

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api", routes)

// app.use(errorHandler)

export default app
