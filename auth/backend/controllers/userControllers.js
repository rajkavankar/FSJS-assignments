import { asyncHandler } from "../helpers/asyncHandler.js"
import Users from "../models/userModel.js"
import CustomError from "../helpers/CustomError.js"
import { config } from "../config/config.js"

const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 2 * 24 * 60 * 60 * 1000,
}

/*
 * @desc: Register a user
 * @path: /users
 * @method: POST
 * @access: PUBLIC
 * @body: {name, email, password, confirmPassword}
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Checking for all required field
  if (!name || !email || !password || !confirmPassword) {
    throw new CustomError("Please fill all details", 400)
  }

  // Checking for already registered email
  if (await Users.findOne({ email })) {
    throw new CustomError("Email is already registerd", 400)
  }

  // Checking password and confirm password equality
  if (password !== confirmPassword) {
    throw new CustomError("Confirm password doesnt match", 400)
  }

  const user = await Users.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      success: true,
      message: "Registered successfully",
    })
  } else {
    throw new CustomError("Something went wrong", 400)
  }
})

/*
 * @desc: Login a user
 * @path: /users/auth
 * @method: POST
 * @access: PUBLIC
 * @body: { email, password}
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Checking for all required field
  if (!email || !password) {
    throw new CustomError("Please fill all details", 400)
  }

  // Checking for already registered email
  const user = await Users.findOne({ email }).select("+password")

  if (user && user.comparePassword(password)) {
    const token = user.getJwtToken()
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        token,
        user: {
          _id: user._id,
        },
      })
  } else {
    throw new CustomError("Invalid crentials", 400)
  }
})

/*
 * @desc: Get access to user profile
 * @path: /users/profile
 * @method: GET
 * @access: PRIVATE
 */
const getProfile = asyncHandler(async (req, res) => {
  const { user } = req
  res.status(200).json({
    success: true,
    user,
  })
})
/*
 * @desc: Update user profile
 * @path: /users/profile
 * @method: PUT
 * @access: PRIVATE
 * @body: { data }
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id)
  if (!user) {
    throw new CustomError("User not found", 404)
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email

  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  if (updatedUser) {
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } else {
    throw new CustomError("Something went wrong")
  }
})

export { register, login, getProfile, updateProfile }
