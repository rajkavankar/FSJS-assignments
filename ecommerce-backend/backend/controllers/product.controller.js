import { config } from "../config/config.js"
import Mongoose from "mongoose"
import { s3Upload, s3Delete } from "../utils/imageUpload.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import Product from "../models/product.schema.js"
import formidable from "formidable"

/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @description Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/
const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true })

  form.parse(req, async function (err, fields, files) {
    if (err) {
      throw new CustomError(err.message || "Something went wrong", 500)
    }

    let productId = new Mongoose.Schema.Types.ObjectId().toHexString()
  })
})
