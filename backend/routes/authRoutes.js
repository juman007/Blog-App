import express from "express";
import {
   login,
   logout,
   refetch,
   register,
} from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/refetch", refetch);

export default authRouter;
