import CustomError  from "../helpers/CustomError.js";
import {asyncHandler} from "../helpers/asyncHandler.js";
import Posts from "../models/postModel.js"


const getPosts = asyncHandler(async(req,res) => {
    const post = false
    if (!post){
        throw new CustomError("Not found", 404)
    }
    res.status(200).json({
        success:true
    })
})

const createPosts = asyncHandler(async(req,res) => {
    const {title, body} = req.body
    if(!title || !body){
        throw new CustomError("Please fill all details", 400)
    }

    const blog = await Posts.create({
        title,
        body
    })

    if (blog){
         res.status(200).json({
             success:true,
             message: "Post created successfully"
        })
    }


})

const updatePost = asyncHandler(async(req,res) => {
    const {id} = req.params

    if(!await Posts.findById(id)){
        throw new CustomError("post is not available", 404)
    }

    const updatedpost = await Posts.findByIdAndUpdate(id,req.body, {new: true})
    if (updatedpost){
        res.status(200).json({
            success:true,
            message:"Post updated successfully"
        })
    }
})

const deletePost = asyncHandler(async(req,res) => {
    const {id} = req.params
     if(!await Posts.findById(id)){
        throw new CustomError("post is not available", 404)
    }

     const deletedPost = await Posts.findByIdAndDelete(id)

    if (deletedPost){
        res.status(200).json({
            success:true,
            message: "Post deleted successfully"
        })
    }

})


export {getPosts, createPosts, updatePost, deletePost}