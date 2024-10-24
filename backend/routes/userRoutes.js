import express from "express";
import {
   getUserProfile,
   userDelete,
   userUpdate,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.put("/update/:id", verifyToken, userUpdate);
userRouter.delete("/delete/:id", verifyToken, userDelete);
userRouter.get("/profile/:id", getUserProfile);

export default userRouter;
