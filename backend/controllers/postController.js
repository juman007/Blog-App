import postModel from "../models/postModel.js";
import commentModel from "../models/Comment.Model.js";
import { v2 as cloudinary } from "cloudinary";

// Create a new post
const createPost = async (req, res, next) => {
   try {
      const { title, description, username, userId, categories } = req.body;

      const newPost = new postModel({
         title,
         description,
         username,
         userId,
         categories,
      });

      const photo = req.file;

      if (photo) {
         const imageUpload = await cloudinary.uploader.upload(photo.path, {
            resource_type: "image",
         });
         const imageUrl = imageUpload.secure_url;

         newPost.photo = imageUrl;
      }

      const savePost = await newPost.save();

      res.json({
         success: true,
         message: "Post published successfully",
         post: savePost,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

//Post update
const postUpdate = async (req, res, next) => {
   try {
      const { title, description, categories } = req.body;
      const { id } = req.params;

      // Find the post by ID first to handle updates correctly
      const existingPost = await postModel.findById(id);
      if (!existingPost) {
         return res.status(404).json({
            success: false,
            message: "Post not found",
         });
      }

      // Update the existing post fields
      existingPost.title = title;
      existingPost.description = description;
      existingPost.categories = categories;

      // Handle photo upload if there's a new photo
      if (req.file) {
         const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image",
         });
         existingPost.photo = imageUpload.secure_url; // Update the photo URL
      }

      // Save the updated post
      const updatedPost = await existingPost.save();

      res.json({
         success: true,
         post: updatedPost,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const deletePost = async (req, res, next) => {
   try {
      const { id } = req.params; // Ensure that `id` is the postId

      // Find and delete the post
      const deletedPost = await postModel.findByIdAndDelete(id); // Use the post ID directly
      if (!deletedPost) {
         return res.status(404).json({
            success: false,
            message: "Post not found",
         });
      }

      // Delete comments associated with the post
      await commentModel.deleteMany({ postId: id }); // Use postId to find associated comments

      res.json({
         success: true,
         message: "Post deleted successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get posts details
const getPostDetails = async (req, res, next) => {
   try {
      const { id } = req.params;

      // Use findById for single document retrieval
      const post = await postModel.findById(id);

      // Check if post exists
      if (!post) {
         return res.status(404).json({
            success: false,
            message: "Post not found",
         });
      }

      // Format post details
      const formattedPostDetails = {
         _id: post._id,
         title: post.title,
         description: post.description,
         photo: post.photo,
         username: post.username,
         userId: post.userId,
         categories: post.categories,
         time: post.time,
         date: post.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
         }),
      };

      res.json({
         success: true,
         post: formattedPostDetails,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get recent posts

const getRecentPosts = async (req, res, next) => {
   try {
      const post = await postModel.find().sort({ createdAt: -1 }).limit(3);
      res.json({
         success: true,
         post,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get all posts

const getAllPosts = async (req, res, next) => {
   const query = req.query.search || ""; // Default to an empty string if no search query
   try {
      // search filter
      const searchFilter = {
         title: { $regex: query, $options: "i" },
      };
      const posts = await postModel.find(query ? searchFilter : {});

      // Format post details
      const formattedPostDetails = posts.map((post) => ({
         _id: post._id,
         title: post.title,
         description: post.description,
         photo: post.photo,
         username: post.username,
         userId: post.userId,
         categories: post.categories,
         time: post.time,
         date: post.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
         }),
      }));

      res.json({
         success: true,
         posts: formattedPostDetails, // Return formatted posts
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get a post for a perticular user

const getUserPosts = async (req, res, next) => {
   try {
      const posts = await postModel.find({ userId: req.params.userId });
      res.json({
         success: true,
         posts,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export {
   createPost,
   postUpdate,
   deletePost,
   getPostDetails,
   getAllPosts,
   getUserPosts,
   getRecentPosts,
};
