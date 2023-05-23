import express from "express"
import {createPosts, deletePost, getPosts, updatePost} from "../controllers/postControllers.js";
const router = express.Router()

router.route("/").get(getPosts).post(createPosts)
router.route("/:id").put(updatePost).delete(deletePost)

export default router