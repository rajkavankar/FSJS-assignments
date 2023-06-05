import { Router } from "express"
import {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js"
import { isLoggedin } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(isLoggedin, createCoupon).get(isLoggedin, getCoupons)

router
  .route("/:id")
  .put(isLoggedin, updateCoupon)
  .delete(isLoggedin, deleteCoupon)

export default router
