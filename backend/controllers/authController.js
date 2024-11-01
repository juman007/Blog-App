import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
         return res.json({
            success: false,
            message: "Missing Details",
         });
      }

      // validating email format
      if (!validator.isEmail(email)) {
         return res.json({
            success: false,
            message: "Please enter a valid emaill",
         });
      }

      // Validating strong password
      if (password.length < 3) {
         return res.json({
            success: false,
            message: "Password must be at least 8 characters long",
         });
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
         username,
         email,
         password: hashedPassword,
      };

      const newUser = new userModel(userData);
      const user = await newUser.save();

      res.json({
         success: true,
         message: "User registered successfully",
         user,
      });
   } catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
         return res.json({
            success: false,
            message: "User not found",
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.json({
            success: false,
            message: "Incorrect password",
         });
      }

      // Generate JWT token
      const token = jwt.sign(
         { _id: user._id, username: user.username, email: user.email },
         process.env.JWT_SECRET,
         {
            expiresIn: "3d",
         }
      );

      res.cookie("token", token, { httpOnly: true, sameSite: "lax" }).json({
         success: true,
         message: "User logged in successfully",
         user: {
            id: user._id,
            username: user.username,
            email: user.email,
         },
      });
   } catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

const logout = async (req, res) => {
   try {
      // Clear the JWT token from the cookie
      res.clearCookie("token", {
         httpOnly: true,
         sameSite: "strict",
         secure: true,
      });

      res.status(200).json({
         success: true,
         message: "User logged out successfully",
      });
   } catch (error) {
      console.log(error);
      res.json({
         success: false,
         message: error.message,
      });
   }
};

const refetch = async (req, res) => {
   const token = req.cookies.token;

   // Check if the token is present
   if (!token) {
      return res
         .status(401)
         .json({ success: false, message: "No token provided" });
   }

   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
      if (err) {
         // Improved error handling with a message
         return res.status(403).json({
            success: false,
            message: "Invalid token",
            error: err.message,
         });
      }

      // Respond with success and the user data
      res.status(200).json({ success: true, data });
   });
};

export { register, login, logout, refetch };
