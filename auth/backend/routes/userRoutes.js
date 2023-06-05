import { Router } from "express"
import {
  login,
  register,
  getProfile,
  updateProfile,
} from "../controllers/userControllers.js"
import { isLoggedin } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/", register)
router.post("/auth", login)
router.route("/profile").get(isLoggedin, getProfile).put(updateProfile)

export default router
