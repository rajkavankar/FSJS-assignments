import { Router } from "express"
import { isLoggedin } from "../middlewares/auth.middleware.js"
import {
  signup,
  signin,
  signout,
  getProfile,
} from "../controllers/user.controller.js"

const router = Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.get("/profile", isLoggedin, getProfile)

export default router
