import React, { useContext, useState, useEffect } from "react";
import uploader from "../assets/uploader.png";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Loader1 from "../components/loader/Loader1";
import { AppContext } from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { toast } from "react-toastify"; // Ensure toast is imported

const CreatePost = () => {
   // App Context
   const { backendURL, user } = useContext(AppContext);
   const { id } = useParams(); // Get the post ID from URL
   const navigate = useNavigate(); // Initialize useNavigate

   const [loader, setLoader] = useState(false);
   const [post, setPost] = useState({});
   const [image, setImage] = useState(null);
   const [title, setTitle] = useState("");
   const [categories, setCategories] = useState([]);
   const [categoryInput, setCategoryInput] = useState("");
   const [postDetails, setPostDetails] = useState("");

   

   // Function to add a category
   const addCategory = () => {
      if (categoryInput && !categories.includes(categoryInput)) {
         setCategories([...categories, categoryInput]);
         setCategoryInput(""); // Clear the input after adding
      }
   };

   // Function to remove a category
   const removeCategory = (categoryToRemove) => {
      setCategories(
         categories.filter((category) => category !== categoryToRemove)
      );
   };

   // API call to fetch post details
   const fetchPost = async () => {
      setLoader(true);
      try {
         const res = await axios.get(`${backendURL}/api/post/details/${id}`);
         const fetchedPost = res.data.post;

         setPost(fetchedPost);
         setTitle(fetchedPost.title);
         setPostDetails(fetchedPost.description);
         setCategories(fetchedPost.categories);
         setImage(fetchedPost.image || null); // Fallback to null if no image
      } catch (error) {
         console.error(error);
      } finally {
         setLoader(false);
      }
   };

   // Function to handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", postDetails);
      formData.append("categories", JSON.stringify(categories));

      if (image) formData.append("photo", image);

      try {
         setLoader(true);
         const res = await axios.put(
            `${backendURL}/api/post/update/${id}`,
            formData,
            {
               withCredentials: true,
            }
         );

         console.log("Response Data:", res.data); // Log the response data
         if (res.data.success) {
            toast.success(res.data.message);
            navigate(`/posts/post/${res.data.post._id}`);
            // Clear form after successful submission
            setImage(null);
            setTitle("");
            setCategories([]);
            setPostDetails("");
         } else {
            toast.error(res.data.message);
         }
      } catch (error) {
         console.error(
            "Error updating post:",
            error.response ? error.response.data : error.message
         );
         toast.error("Error updating post. Please try again.");
      } finally {
         setLoader(false);
      }
   };

   useEffect(() => {
      fetchPost(); // Fetch post details on component mount
   }, [id]);

   // Conditional rendering for post
   if (loader) {
      return (
         <div className="mt-20 min-h-[80vh] flex justify-center items-center">
            <Loader1 />
         </div>
      ); // Show loading state while fetching post
   }

   return (
      <div className="mt-16 mb-10 w-full flex flex-col items-center px-4 sm:px-8">
         <h1 className="text-center font-bold text-3xl text-blue-500 mb-8">
            Update Post
         </h1>

         <form
            className="flex flex-col gap-6 w-full max-w-[80%]"
            onSubmit={handleSubmit} // Update form submission handler
         >
            {/* Image Uploader */}
            <div className="flex justify-center">
               <label htmlFor="post-img" className="cursor-pointer">
                  <img
                     className="w-36"
                     src={image ? URL.createObjectURL(image) : uploader}
                     alt="Upload"
                  />
               </label>
               <input
                  type="file"
                  id="post-img"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
               />
            </div>

            {/* Post Title */}
            <div className="w-full">
               <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Post title..."
                  className="w-full px-4 py-2 border rounded focus:outline-none border-gray-400"
               />
            </div>

            {/* Category Input */}
            <div className="w-full flex items-center gap-3">
               <input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  type="text"
                  placeholder="Category"
                  className="flex-grow px-4 py-2 border rounded focus:outline-none border-gray-400"
               />
               <button
                  type="button"
                  onClick={addCategory}
                  className="border border-gray-400 text-black py-2 px-6 rounded hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
               >
                  Add
               </button>
            </div>

            {/* Show Categories */}
            <div className="w-full flex flex-wrap justify-center sm:justify-start gap-3">
               {categories.map((category, index) => (
                  <div
                     key={index}
                     className="flex items-center gap-2 px-2 py-1 shadow-md rounded-lg border border-gray-400"
                  >
                     <p className="bg-blue-300 px-3 py-1 rounded-md text-sm">
                        {category}
                     </p>
                     <button
                        onClick={() => removeCategory(category)}
                        className="bg-red-500 text-white p-2 rounded-full"
                     >
                        <MdDeleteForever size={20} />
                     </button>
                  </div>
               ))}
            </div>

            {/* Textarea for Post Details */}
            <div className="w-full">
               <textarea
                  value={postDetails}
                  onChange={(e) => setPostDetails(e.target.value)}
                  rows={8}
                  placeholder="Post details..."
                  className="w-full px-4 py-2 border rounded focus:outline-none border-gray-400"
               ></textarea>
            </div>

            <button
               type="submit"
               className="bg-green-500 hover:bg-green-600 text-white rounded-md py-1 font-semibold"
            >
               Update
            </button>
         </form>
      </div>
   );
};

export default CreatePost;
