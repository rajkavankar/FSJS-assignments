import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password)
  },

  getJwtToken: function () {
    return jwt.sign({ _id: this._id }, config.JWT_SECRET, {
      expiresIn: "2d",
    })
  },
}

export default mongoose.model("users", userSchema)
