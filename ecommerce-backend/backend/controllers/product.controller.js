import { config } from "../config/config.js"
import Mongoose from "mongoose"
import { s3Upload, s3Delete } from "../utils/imageUpload.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"
import Product from "../models/product.schema.js"
import formidable from "formidable"
import fs from "fs"

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

    if (
      !fields.name ||
      !fields.price ||
      !fields.descripsion ||
      !fields.colledtionId
    ) {
      throw new CustomError("All fields are required", 400)
    }

    let imgRes = Promise.all(
      Object.keys(files).map(async (file, index) => {
        const element = file[fileKey]
        const data = fs.readFileSync(element.filepath)

        const upload = await s3Upload({
          bucket: config.S3_BUCKET_NAME,
          key: `products/${productId}/photo-${index + 1}.png`,
          body: data,
          contentType: element.mimetype,
        })

        return {
          secure_url: upload,
        }
      })
    )
    const product = await Product.create({
      _id: productId,
      photos: imgRes,
      ...fields,
    })

    if (product) {
      res.status(201).json({
        success: true,
        product,
      })
    } else {
      throw new CustomError("Product failed to create", 400)
    }
  })
})

/**********************************************************
 * @GET_PRODUCTS
 * @route https://localhost:5000/api/products
 * @description Controller used for getting all products
 * @returns Product Array
 *********************************************************/
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()

  if (!products) {
    throw new CustomError("Products not found", 500)
  }

  res.status(200).json({
    success: true,
    products,
  })
})

/**********************************************************
 * @GET_PRODUCT
 * @route https://localhost:5000/api/products/:id
 * @description Controller used for get a single product
 * @returns Product Object
 *********************************************************/
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  const product = await Product.findById(id)

  if (!product) {
    throw new CustomError("Product not found", 404)
  }

  res.status(200).json({
    success: true,
    product,
  })
})

/**********************************************************
 * @GET_PRODUCTS_BY_COLLECTION
 * @route https://localhost:5000/api/products/:collectinId
 * @description Controller used for get all products by collection
 * @returns Products Array
 *********************************************************/
const getProductByCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params

  const products = await Product.find({ collectionId })

  if (!products) {
    throw new CustomError("Products not found", 400)
  }

  res.status(200).json({
    success: true,
    products,
  })
})

/**********************************************************
 * @DELETE_PRODUCT
 * @route https://localhost:5000/api/products/:id
 * @description Controller used to delete a product
 * @returns Succes message
 *********************************************************/
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  const product = await Product.findById(id)

  if (!product) {
    throw new CustomError("Product not found", 404)
  }

  const deletePhotos = Promise.all(
    product.photos.map(async (elem, index) => {
      await s3Delete({
        bucket: config.S3_BUCKET_NAME,
        key: `products/${product._id}/photo-${index + 1}.png`,
      })
    })
  )

  await deletePhotos

  await product.remove()

  res.status(200).json({
    success: true,
    message: "Product delete",
  })
})

export { addProduct, getAllProducts, getSingleProduct, getProductByCollection }
