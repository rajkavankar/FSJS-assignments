import Collection from "../models/collection.schema.js"
import asyncHandler from "../utils/asyncHandler.js"
import CustomError from "../utils/CustomError.js"

/******************************************************
 * @CREATECOLLECTION
 * @METHOD POST
 * @route http://localhost:5000/api/collection
 * @description Controller to create collection
 * @returns Success message
 ******************************************************/
const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new CustomError("Name is required", 400)
  }

  const collection = await Collection.create({
    name,
  })

  if (collection) {
    res.status(200).json({
      success: true,
      collection,
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/******************************************************
 * @UPDATECOLLECTION
 * @METHOD PUT
 * @route http://localhost:5000/api/collection/:id
 * @description Controller to update collection
 * @returns Collection object
 ******************************************************/
const updateCollection = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { id } = req.params

  if (!name) {
    throw new CustomError("Name is required", 400)
  }

  const updatedCollection = await Collection.findByIdAndUpdate(
    id,
    { name },
    {
      new: true,
      runValidators: true,
    }
  )

  if (updatedCollection) {
    res.status(200).json({
      success: true,
      updatedCollection,
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/******************************************************
 * @DELETECOLLECTION
 * @METHOD DELETE
 * @route http://localhost:5000/api/collection/:id
 * @description Controller to delete collection
 * @returns Success message
 ******************************************************/
const deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params

  const deletedCollection = await Collection.findOneAndDelete(id)

  if (deletedCollection) {
    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

/******************************************************
 * @GETALLCOLLECTIONS
 * @METHOD GET
 * @route http://localhost:5000/api/collection/
 * @description Controller to get all collection
 * @returns Array with all collections
 ******************************************************/
const getAllCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find()

  if (collections) {
    res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    })
  } else {
    throw new CustomError("Something went wrong", 500)
  }
})

export {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
}
