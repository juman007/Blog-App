import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/Comment.Model.js";
import bcrypt from "bcrypt";

// update user

const userUpdate = async (req, res) => {
   try {
      const { id } = req.params; // Extract ID from route params
      const { password, ...otherData } = req.body; // Extract password and other fields from body
      let updatedData = { ...otherData };

      if (password) {
         // Hash the user password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
         updatedData.password = hashedPassword; // Include hashed password in update data
      }

      // Update user by ID
      const user = await userModel.findByIdAndUpdate(id, updatedData, {
         new: true, // Return the updated user document
      });

      res.json({
         success: true,
         message: "User updated successfully",
         user,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// delete user

const userDelete = async (req, res) => {
   try {
      await userModel.findByIdAndDelete(req.params.id);
      await postModel.deleteMany({ userId: req.params.id });
      await commentModel.deleteMany({ userId: req.params.id });

      res.json({
         success: true,
         message: "User deleted successfully",
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get user profile

const getUserProfile = async (req, res) => {
   try {
      const user = await userModel.findById(req.params.id).select("-password");

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      res.status(200).json({
         success: true,
         user,
      });
   } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
      });
   }
};

export { userUpdate, userDelete, getUserProfile };
