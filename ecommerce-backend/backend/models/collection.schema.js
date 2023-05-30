import mongoose from "mongoose"

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("collection", collectionSchema)
