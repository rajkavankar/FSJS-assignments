import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    descripsion: {
      type: String,
      required: [true, "Descripsion is required"],
      trim: true,
    },
    photos: [
      {
        secure_url: {
          type: String,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collection",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("product", productSchema)
