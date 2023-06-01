import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use("/api", routes)

app.all("*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

export default app
