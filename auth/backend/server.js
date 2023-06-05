import app from "./app.js"
import { config } from "./config/config.js"
import ConnectDB from "./config/DB.js"
const port = config.PORT

// Database connection
ConnectDB()

app.get("/", (_req, res) => {
  res.status(200).json({
    succes: true,
    message: "welcome",
  })
})

app.set("*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "page.not foundt",
  })
})

app.listen(port, () =>
  console.log(`Server is running in ${config.NODE_ENV} mode on port ${port}`)
)
