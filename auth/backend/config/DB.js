import mongoose from "mongoose"
import { config } from "./config.js"

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URL)
    if (conn) {
      console.log(`Database connected at ${conn.connection.host}`)
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
    console.log("Database connection failed")
  }
}

export default ConnectDB
