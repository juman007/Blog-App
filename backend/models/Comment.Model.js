// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema(
//    {
//       comment: { type: String, required: true },
//       authorname: { type: String, required: true },
//       postId: { type: String, required: true },
//       userId: { type: String, required: true },
//       date: { type: Date, default: Date.now },
//    },
//    { timestamps: true }
// );

// const commentModel =
//    mongoose.models.Comment || mongoose.model("Comment", commentSchema);

// export default commentModel;



import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
   {
      comment: { type: String, required: true },
      authorname: { type: String, required: true },
      postId: { type: String, required: true },
      userId: { type: String, required: true },
      date: { type: Date, default: Date.now },
      time: { type: String, default: () => new Date().toLocaleTimeString() },
   },
   { timestamps: true }
);

// Method to format date
commentSchema.methods.getFormattedDate = function () {
   const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
   return this.date.toLocaleDateString("en-GB", options);
};

const commentModel =
   mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default commentModel;
