import { asyncHandler } from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import Coupon from "../models/coupon.schema.js"

/**********************************************************
 * @CREATE_COUPON
 * @route https://localhost:5000/api/coupon
 * @description Controller used for creating a new coupon
 * @description Only admin and Moderator can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body

  if (!code || !discount) {
    throw new CustomError("Please provide all fields", 400)
  }

  const coupon = await Coupon.create({
    code,
    discount,
  })

  if (coupon) {
    res.status(200).json({
      success: true,
      message: "Coupon created successfully",
    })
  } else {
    throw new CustomError("Something went wrong")
  }
})

/**********************************************************
 * @GET_ALL_COUPONS
 * @route https://localhost:5000/api/coupon
 * @description Controller used for getting all coupons
 * @description Only admin and Moderator can list the coupons
 * @returns Coupon Array
 *********************************************************/
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find()

  if (coupons) {
    res.status(200).json({
      success: true,
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/**********************************************************
 * @UPDATE_COUPONS
 * @route https://localhost:5000/api/coupon/:id
 * @description Controller used for updating a coupon
 * @description Only admin and Moderator can update the coupon
 * @returns Coupon Object
 *********************************************************/
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.body

  const coupon = await Coupon.findById(id)

  if (!coupon) {
    throw new CustomError("Coupon not found", 404)
  }

  const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (updatedCoupon) {
    res.status(200).josn({
      success: true,
      updateCoupon,
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/**********************************************************
 * @DELETE_COUPONS
 * @route https://localhost:5000/api/coupon/:id
 * @description Controller used for deleting a coupon
 * @description Only admin and Moderator can delete the coupon
 * @returns Success message
 *********************************************************/
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.body

  const coupon = await Coupon.findById(id)

  if (!coupon) {
    throw new CustomError("Coupon not found", 404)
  }

  const deletedCoupon = await Coupon.findByIdAndDelete(id)

  if (deletedCoupon) {
    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

export { createCoupon, getCoupons, updateCoupon, deleteCoupon }
