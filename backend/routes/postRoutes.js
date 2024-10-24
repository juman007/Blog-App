import express from "express";
import {
   createPost,
   deletePost,
   postUpdate,
   getPostDetails,
   getAllPosts,
   getUserPosts,
   getRecentPosts,
} from "../controllers/postController.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.post("/write", upload.single("photo"), verifyToken, createPost);
postRouter.put("/update/:id", verifyToken, upload.single("photo"), postUpdate);
postRouter.delete("/delete/:id", verifyToken, deletePost);
postRouter.get("/details/:id", getPostDetails);
postRouter.get("/all-post", getAllPosts);
postRouter.get("/recent", getRecentPosts);
postRouter.get("/:userId", getUserPosts);

export default postRouter;
