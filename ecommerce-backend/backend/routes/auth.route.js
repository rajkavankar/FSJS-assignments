import { Router } from "express"
import { isLoggedin } from "../middlewares/auth.middleware.js"
import {
  signup,
  signin,
  signout,
  getProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js"

const router = Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.get("/profile", isLoggedin, getProfile)

router.post("/forget-password", forgotPassword)
router.post("/reset/:token", resetPassword)

export default router
