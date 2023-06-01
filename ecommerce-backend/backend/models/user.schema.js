import mongoose from "mongoose"
import AuthRoles from "../utils/authRoles.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { nanoid } from "nanoid"
import { config } from "../config/config.js"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods = {
  validatePassword: async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
  },
  generateJwtToken: function () {
    return jwt.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY,
    })
  },
  generateForgotToken: async function () {
    const forgotToken = nanoid()
    this.forgotPasswordToken = forgotToken
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000
    return forgotToken
  },
}

export default mongoose.model("user", userSchema)
