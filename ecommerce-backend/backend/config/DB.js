import mongoose from "mongoose"
import { config } from "./config.js"

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI)
    if (conn) {
      console.log(`Database connected at ${conn.connection.host}`)
    }
  } catch (error) {
    console.log(`Database error: ${error}`)
    process.exit(1)
  }
}
