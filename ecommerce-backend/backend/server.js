import app from "./app.js"
import { config } from "./config/config.js"
import { ConnectDB } from "./config/DB.js"

// Database connection
ConnectDB()

app.listen(config.PORT, () =>
  console.log(
    `Server is runnging on port ${config.PORT} in ${config.NODE_ENV} mode`
  )
)
