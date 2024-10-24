import React, { useContext, useState } from "react";
import axios from "axios";
import uploader from "../assets/uploader.png";
import { MdDeleteForever } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader1 from "../components/loader/Loader1";

const CreatePost = () => {
   // Loader
   const [loader, setLoader] = useState(false);

   const [image, setImage] = useState(null);
   const [title, setTitle] = useState("");
   const [categories, setCategories] = useState([]);
   const [categoryInput, setCategoryInput] = useState("");
   const [postDetails, setPostDetails] = useState("");

   const navigate = useNavigate();

   // APP context
   const { user, backendURL } = useContext(AppContext);

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

   // Function to handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", postDetails);
      formData.append("categories", JSON.stringify(categories)); // Send categories as JSON string
      formData.append("username", user.data.username);
      formData.append("userId", user.data._id);
      if (image) formData.append("photo", image);

      try {
         setLoader(true);
         const res = await axios.post(
            backendURL + "/api/post/write",
            formData,
            { withCredentials: true }
         );
         toast.success(res.data.message);
         navigate(`/posts/post/${res.data.post._id}`);

         // Clear form after successful submission
         setImage(null);
         setTitle("");
         setCategories([]);
         setPostDetails("");
      } catch (error) {
         console.error("Error creating post:", error);
      } finally {
         setLoader(false); // Ensure loader is turned off after submission
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

   return (
      <div className="mt-16 mb-10 w-full flex flex-col items-center px-4 sm:px-8">
         <h1 className="text-center font-bold text-3xl text-blue-500 mb-8">
            Create Post
         </h1>

         <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-[80%]"
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
               Create
            </button>
         </form>
      </div>
   );
};

export default CreatePost;
