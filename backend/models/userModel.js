import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }, // No 'unique' constraint for password
   },
   { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
