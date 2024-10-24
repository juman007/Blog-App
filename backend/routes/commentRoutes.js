import express from "express";
import {
   createComment,
   deleteComment,
   getPostComments,
   updateComment,
} from "../controllers/commentController.js";
import verifyToken from "../middleware/verifyToken.js";

const commentRouter = express.Router();

commentRouter.post("/new-comment", verifyToken, createComment);
commentRouter.put("/update/:id", verifyToken, updateComment);
commentRouter.delete("/delete/:id", verifyToken, deleteComment);
commentRouter.get("/post/:postId", getPostComments);
export default commentRouter;
