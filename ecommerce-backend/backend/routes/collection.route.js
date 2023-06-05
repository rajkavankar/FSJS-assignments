import { Router } from "express"
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
} from "../controllers/collection.controller.js"
import { isLoggedin } from "../middlewares/auth.middleware.js"
const router = Router()

router
  .route("/")
  .get(isLoggedin, getAllCollections)
  .post(isLoggedin, createCollection)

router
  .route("/:id")
  .put(isLoggedin, updateCollection)
  .delete(isLoggedin, deleteCollection)

export default router
