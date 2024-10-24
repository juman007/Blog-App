import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Commnets = ({ postId }) => {
   // APP Context
   const { backendURL, user } = useContext(AppContext);

   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");

   // fetch comments
   const fetchComments = async () => {
      try {
         const res = await axios.get(
            `${backendURL}/api/comment/post/postId`
         );
         setComments(res.data.comments);
      } catch (error) {
         console.error("Error fetching comments:", error);
      }
   };

   // Handle adding a new comment
   const handleAddComment = () => {
      if (newComment.trim() !== "") {
         setComments((prevComments) => [...prevComments, newComment]); // Use functional update for state
         setNewComment(""); // Clear input after adding
      }
   };

   return (
      <>
         <div className="mt-5">
            <h1 className="text-lg md:text-xl bg-gray-200 font-semibold pl-2">
               Comments
            </h1>
            {comments.map((comment, index) => (
               <div
                  className="flex justify-between pl-3 bg-green-200 mb-2"
                  key={index}
               >
                  <p className="">{comment}</p>
                  {user?.data._id === post?.userId && (
                     <div className="flex justify-end items-center gap-1">
                        <Link to={"/edit"}>
                           <FiEdit />
                        </Link>
                        <Link to={"/delete"}>
                           <MdDeleteForever />
                        </Link>
                     </div>
                  )}
               </div>
            ))}
         </div>

         {/* Add Comments */}
         <div className="w-full flex gap-2 items-center mt-5 mb-5">
            <input
               className="border w-full py-1 px-3 outline-none text-sm"
               type="text"
               placeholder="Write a comment..."
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
            />
            <button
               className="bg-green-500 py-1 px-4 text-black font-semibold text-sm"
               onClick={handleAddComment}
            >
               Send
            </button>
         </div>
      </>
   );
};

export default Commnets;
