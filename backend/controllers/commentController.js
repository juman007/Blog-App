import commentModel from "../models/Comment.Model.js";

//  new comment
const createComment = async (req, res) => {
   try {
      const { comment, authorname, postId, userId } = req.body;

      const newComment = new commentModel({
         comment,
         authorname,
         postId,
         userId,
      });

      const savedComment = await newComment.save();

      res.json({ comment: savedComment });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

// update comment

const updateComment = async (req, res) => {
   try {
      const comment = await commentModel.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
      );
      if (!comment)
         return res.status(404).json({ message: "Comment not found" });
      res.json({ comment });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

// delete comment

const deleteComment = async (req, res) => {
   try {
      const { id } = req.params;

      const deletedComment = await commentModel.findByIdAndDelete(id);

      if (!deletedComment) {
         return res.status(404).json({ message: "Comment not found" });
      }

      res.json({ deletedComment });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getPostComments = async (req, res) => {
   try {
      const { postId } = req.params;
      const comments = await commentModel.find({ postId });

      // Format the comments, including formatting the date
      const formattedComments = comments.map((comment) => ({
         id: comment._id,
         comment: comment.comment,
         authorname: comment.authorname,
         postId: comment.postId,
         userId: comment.userId,
         time: comment.time,
         formattedDate: comment.date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
         }),
      }));

      res.json({ comments: formattedComments });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

export { createComment, getPostComments, updateComment, deleteComment };
