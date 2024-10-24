import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      description: { type: String, required: true },
      photo: { type: String, required: false },
      username: { type: String, required: true },
      userId: { type: String, required: true },
      categories: { type: Array },
      date: { type: Date, default: Date.now },
      time: { type: String, default: () => new Date().toLocaleTimeString() },
   },
   { timestamps: true }
);

// Method to format date
postSchema.methods.getFormattedDate = function () {
   const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
   return this.date.toLocaleDateString("en-GB", options);
};

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

export default postModel;
