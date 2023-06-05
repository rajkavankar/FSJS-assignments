import { asyncHandler } from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import User from "../models/user.schema.js"
import { config } from "../config/config.js"
import { mailHelper } from "../utils/mailHelper.js"

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

  if (!email || !password) {
    throw new CustomError("Please provide all fields", 400)
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    throw new CustomError("Email is not registered", 404)
  }

  const isValidUser = await user.validatePassword(password)

  if (isValidUser) {
    user.password = undefined
    const token = await user.generateJwtToken()
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

/******************************************************
 * @FORGOT_PASSOWRD
 * @METHOD POST
 * @route http://localhost:5000/api/auth/forgotpassword
 * @description User forgot password controller to send reset url in email
 * @returns Success message
 ******************************************************/
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new CustomError("Email is required", 400)
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError("Email is not registerd", 400)
  }

  const forgotToken = user.generateForgotToken()

  await user.save({ validateBeforeSave: false })

  const url = `${req.protocol}://${req.get("host")}/auth/reset/${forgotToken}`

  const message = `Reset Url \n\n ${url}`

  try {
    await mailHelper({
      email,
      subject: "Password reset ",
      message,
    })
  } catch (error) {
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    user.save({ validateBeforeSave: false })
    throw new CustomError(error.message || "Something went wrong", 500)
  }
})

/******************************************************
 * @RESET_PASSOWRD
 * @METHOD POST
 * @route http://localhost:5000/api/auth/reset/:token
 * @description User forgot password controller to send reset url in email
 * @returns Success message
 ******************************************************/
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const user = await User.find({
    forgotPasswordToken: token,
    forgotPasswordExpiry: { $gt: Date.now() },
  })

  if (!user) {
    throw new CustomError("User not found", 404)
  }

  user.password = password
  user.forgotPasswordToken = undefined
  user.forgotPasswordExpiry = undefined
  user.save()

  res.status(200).json({
    success: true,
    user,
  })
})

export { signup, signin, signout, getProfile, forgotPassword, resetPassword }
