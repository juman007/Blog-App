import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSquareXTwitter, FaTelegram, FaYoutube } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import Loader1 from "../components/loader/Loader1";
import { toast } from "react-toastify";

const PostDetails = () => {
   const navigate = useNavigate();

   // APP Context
   const { backendURL, user } = useContext(AppContext);

   // loader
   const [loader, setLoader] = useState(false);

   const [post, setPost] = useState({});
   const [recentPost, setRecentPost] = useState([]);
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState("");
   const { id } = useParams();

   // API call to fetch post details
   const fetchPost = async () => {
      setLoader(true); // Show loader while fetching post details
      try {
         const res = await axios.get(`${backendURL}/api/post/details/${id}`);
         setPost(res.data.post);

         setLoader(false);
      } catch (error) {
         console.error(error);
      }
   };

   // API call to fetch recent posts
   const fetchRecentPosts = async () => {
      try {
         const res = await axios.get(`${backendURL}/api/post/recent`); // Adjust API route if needed
         setRecentPost(res.data.post); // Update state
      } catch (error) {
         console.error("Error fetching recent posts:", error);
      }
   };

   useEffect(() => {
      fetchPost(); // If you have a fetchPost function
      fetchRecentPosts();
   }, [id, user]);

   // fetch comments
   useEffect(() => {
      const fetchComments = async () => {
         try {
            const res = await axios.get(
               `${backendURL}/api/comment/post/${post?._id}`
            );
            setComments(res.data.comments);
         } catch (error) {
            console.error("Error fetching comments:", error.message);
         }
      };

      fetchComments();
   }, [post, backendURL]);

   // Handle adding a new comment

   const handleAddComment = async () => {
      try {
         if (!user) {
            toast.warning("You need to be logged in to add a comment.");
            return;
         }

         const commentData = {
            comment: newComment,
            authorname: user?.data?.username,
            postId: post?._id,
            userId: user?.data?._id,
         };

         const response = await axios.post(
            `${backendURL}/api/comment/new-comment`,
            commentData,
            { withCredentials: true }
         );

         setNewComment("");

         if (response.data.comment) {
            setComments((prevComments) => [
               ...prevComments,
               response.data.comment,
            ]);
         }

         const res = await axios.get(
            `${backendURL}/api/comment/post/${post?._id}`,
            { withCredentials: true }
         );
         setComments(res.data.comments);
      } catch (error) {
         console.error("Error adding comment:", error);
      }
   };

   // Conditional rendering for post
   if (loader) {
      return (
         <div className="mt-20 min-h-[80vh] flex justify-center items-center">
            <Loader1 />
         </div>
      ); // Show loading state while fetching post
   }

   // Helper function to truncate text to a specific word count
   const truncateText = (text = "", wordLimit) => {
      // Default text to empty string
      const words = text.split(" ");
      if (words.length > wordLimit) {
         return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
   };

   const handleScrollToTop = () => {
      window.scrollTo(0, 0); // Scroll to top
   };

   const handleDeletePost = async () => {
      try {
         const res = await axios.delete(
            `${backendURL}/api/post/delete/${post._id}`, // Ensure you are using the correct post ID
            { withCredentials: true }
         );
         if (res.data.success) {
            toast.success("Post deleted successfully!");
            navigate("/"); // Navigate after successful deletion
         }
      } catch (error) {
         console.error(error);
      }
   };

   const deleteCommentHandler = async (event, id) => {
      event.preventDefault();
      try {
         await axios.delete(`${backendURL}/api/comment/delete/${id}`, {
            withCredentials: true,
         });

         const res = await axios.get(
            `${backendURL}/api/comment/post/${post?._id}`,
            { withCredentials: true }
         );
         setComments(res.data.comments);
      } catch (error) {
         console.error("Error deleting comment:", error.message);
      }
   };

   return (
      <div className="mt-20 mb-10 gap-5  w-full md:w-[80%] h-auto m-auto flex flex-col md:flex-row justify-between px-4 detail-sec-main">
         {/* Left Section */}
         <div className="w-full md:w-[75%] ">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
               {post.title}
            </h1>
            <div className="flex justify-between items-center bg-blue-200 px-2 py-1">
               <p className="text-sm md:text-xs">@{post.username}</p>
               <div className="flex gap-3">
                  <p className="text-sm md:text-xs">{post.date}</p>

                  <p className="text-sm md:text-xs">{post.time}</p>

                  {/* add condition only post user can see this  */}
                  {user?.data?._id === post?.userId && (
                     <div className="flex justify-end items-center gap-1">
                        <button
                           onClick={() => {
                              navigate(`/edit/${post?._id}`);
                           }}
                        >
                           <FiEdit />
                        </button>
                        <Link onClick={handleDeletePost}>
                           <MdDeleteForever />
                        </Link>
                     </div>
                  )}
               </div>
            </div>

            <div className="w-full h-[250px] md:h-[400px] mt-2">
               <img
                  className="w-full h-full object-cover"
                  src={post.photo}
                  alt=""
               />
            </div>

            <p className="mt-5 text-sm md:text-base">{post.description}</p>

            <div>
               {/* Show Comments */}
               <div className="mt-5">
                  <h1 className="text-lg md:text-xl bg-gray-200 font-semibold pl-2">
                     Comments
                  </h1>
                  {comments.map((comment, index) => (
                     <div
                        className="flex flex-col justify-between pl-3 bg-green-200 mb-2"
                        key={index}
                     >
                        <div className="flex justify-between px-1 py-1 cursor-pointer">
                           <p className="bg-green-600 px-2 py-1 rounded-full text-white text-xs">
                              @{comment.authorname}
                           </p>
                           <div className="flex justify-end gap-5">
                              {" "}
                              <p className="bg-green-600 px-2 py-1 rounded-full text-white text-xs">
                                 {comment.formattedDate}
                              </p>
                              <p className="bg-green-600 px-2 py-1 rounded-full text-white text-xs">
                                 {comment.time}
                              </p>
                           </div>
                        </div>
                        <div className="flex justify-between px-1 py-1">
                           <p className="px-1">{comment.comment}</p>
                           {/* Adjust to access the correct property */}
                           {user?.data?._id === post?.userId && (
                              <div className="flex justify-end items-center gap-1">
                                 <Link
                                    onClick={(event) =>
                                       deleteCommentHandler(event, comment.id)
                                    }
                                 >
                                    <MdDeleteForever className="text-xl text-red-600" />
                                 </Link>
                              </div>
                           )}
                        </div>
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
            </div>
         </div>

         {/* Right Section */}
         <div className="w-full md:w-[25%] h-[500px] border  mt-5 md:mt-0">
            {/* Follow Us */}

            <div className=" flex flex-col justify-between items-center border-b pb-3">
               <h1 className="text-lg  font-semibold text-white w-full bg-green-500 text-center mb-2">
                  Follow Us
               </h1>
               <div className="flex justify-center gap-5 items-center text-2xl">
                  <Link
                     className="hover:scale-110 transition-all duration-150 ease-in-out"
                     to="#"
                  >
                     <FaSquareXTwitter />
                  </Link>
                  <Link
                     className="hover:scale-110 transition-all duration-150 ease-in-out"
                     to={"#"}
                  >
                     <FaTelegram className="text-blue-500" />
                  </Link>
                  <Link
                     className="hover:scale-110 transition-all duration-150 ease-in-out"
                     to={"#"}
                  >
                     <FaYoutube className="text-red-500" />
                  </Link>
                  <Link
                     className="hover:scale-110 transition-all duration-150 ease-in-out"
                     to={"#"}
                  >
                     <IoLogoWhatsapp className="text-green-500" />
                  </Link>
               </div>
            </div>

            {/* News latter */}
            <div className="flex flex-col">
               <h1></h1>
               <h1 className="text-lg  font-semibold text-white w-full bg-blue-500 text-center mb-2">
                  Subscribe to our newsletter.
               </h1>
               <div className="flex justify-between items-center">
                  <input
                     className="border  w-full py-2 px-3 outline-none text-sm"
                     type="email"
                     placeholder="Enter your email address..."
                  />
                  <button
                     className="bg-[#6366F1] text-white text-sm px-2 py-2 font-semibold"
                     type="button"
                  >
                     Subscribe
                  </button>
               </div>
            </div>

            {/* latest post */}
            <div className="mt-5">
               <h1 className="text-lg  font-semibold text-white w-full bg-red-500 text-center mb-2">
                  Recent Posts
               </h1>

               {recentPost.map((item, index) => (
                  <Link
                     onClick={handleScrollToTop}
                     key={index}
                     to={`/posts/post/${item._id}`}
                     className="border w-full h-[100px] flex  gap-x-1 mb-2"
                  >
                     <div className="h-full border w-[120px]">
                        <img
                           className="w-full h-full object-cover"
                           src={item.photo}
                           alt=""
                        />
                     </div>

                     <div className="flex-1">
                        <p className="font-bold text-sm detail-sec-rignt-title">
                           {truncateText(item.title, 5)}
                        </p>
                        <div className="flex justify-between mt-3">
                           <p className="text-xs">@{item.username}</p>
                           <div className="flex justify-between">
                              <p className="text-xs">{item.date}</p>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
};

export default PostDetails;
