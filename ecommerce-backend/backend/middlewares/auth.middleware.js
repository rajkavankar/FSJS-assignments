import { config } from "../config/config.js"
import CustomError from "../utils/CustomError.js"
import User from "../models/user.schema.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const isLoggedin = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("bearer"))
  ) {
    token = req.cookies.token || req.header.authorization.split(" ")[1]
  }

  if (!token) {
    throw new CustomError("Unauthorized access", 401)
  }

  try {
    console.log(token, typeof token)
    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = await User.findById(decoded._id, "name email role")
    next()
  } catch (error) {
    console.log(error)
    throw new CustomError("Not authorized", 401)
  }
})

export const authorize = (...reqiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!reqiredRoles.includes(req.user.role)) {
      throw new CustomError("Unauthorized access", 401)
    }
    next()
  })
