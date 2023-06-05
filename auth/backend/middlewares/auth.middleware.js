import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import { config } from "../config/config.js"
import { asyncHandler } from "../helpers/asyncHandler.js"
import CustomError from "../helpers/CustomError.js"

export const isLoggedin = asyncHandler(async (req, res, next) => {
  let token
  try {
    if (
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
    ) {
      token = req.cookies.token || req.headers.authorization.split(" ")[1]
      let decoded = jwt.verify(token, config.JWT_SECRET)
      req.user = await User.findById(decoded._id)
      next()
    }

    if (!token) {
      throw new CustomError("Unauthorized access", 401)
    }
  } catch (error) {
    throw new CustomError(error.message || "Unauthorized access", 400)
  }
})
