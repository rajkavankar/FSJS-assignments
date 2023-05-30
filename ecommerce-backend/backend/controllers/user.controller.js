import asyncHandler from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import User from "../models/user.schema.js"
import { config } from "../config/config.js"

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 2 * 24 * 60 * 60 * 1000,
}

/******************************************************
 * @SIGNUP
 * @METHOD POST
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @returns Success message
 ******************************************************/
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new CustomError("Please provide all fields", 400)
  }

  if (await User.findOne({ email })) {
    throw new CustomError("Email is already registerd", 400)
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  user.password = undefined

  if (user) {
    res.status(201).json({
      success: true,
      message: "Registered successfuly",
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/******************************************************
 * @SIGNIN
 * @METHOD POST
 * @route http://localhost:5000/api/auth/signin
 * @description User signIn Controller for logging in
 * @returns User object
 ******************************************************/
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    throw new CustomError("Email is not registered", 404)
  }

  const isValidUser = await user.validatePassword(password)

  if (isValidUser) {
    user.password = undefined
    const token = user.generateJwtToken()
    res.cookie("token", token, cookieOptions)
    return res.status(200).json({
      success: true,
      token,
      user,
    })
  } else {
    throw new CustomError("Invalid credentials", 400)
  }
})

/******************************************************
 * @SIGNOUT
 * @METHOD GET
 * @route http://localhost:5000/api/auth/signout
 * @description User signout Controller for logging out
 * @returns Success message
 ******************************************************/
const signout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  })
})

/******************************************************
 * @GETPROFILE
 * @METHOD GET
 * @route http://localhost:5000/api/auth/prifile
 * @description User dontroller to get user profile
 * @returns User object
 ******************************************************/
const getProfile = asyncHandler(async (req, res) => {
  const { user } = req
  if (!user) {
    throw new CustomError("User not found", 404)
  }
  res.status(200).json({
    success: true,
    user,
  })
})

export { signup, signin, signout, getProfile }
