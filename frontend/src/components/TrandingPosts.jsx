import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loarder from "../components/Loarder";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const TrendingPosts = () => {
   const [posts, setPosts] = useState([]);
   const [loader, setLoader] = useState(false);

   // API Context
   const { backendURL } = useContext(AppContext);
   // State to manage the number of posts displayed
   const [visiblePosts, setVisiblePosts] = useState(6); // Show 6 posts initially

   // Function to handle loading more posts
   const loadMorePosts = () => {
      setVisiblePosts((prevVisible) => prevVisible + 3); // Load 3 more posts on click
   };

   // Helper function to truncate text to a specific word count
   const truncateText = (text = "", wordLimit) => {
      // Default text to empty string
      const words = text.split(" ");
      if (words.length > wordLimit) {
         return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
   };

   const fetchPosts = async () => {
      setLoader(true);
      try {
         const { data } = await axios.get(`${backendURL}/api/post/all-post`);

         setPosts(data.posts);
         setLoader(false);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchPosts();
   }, []);

   const handleScrollToTop = () => {
      window.scrollTo(0, 0); // Scroll to top
   };

   if (loader) {
      return <div></div>;
   }

   return (
      <div className="w-full  mt-5 p-5">
         <h1 className="text-center text-3xl font-bold mb-5">
            <span className="text-red-500 animate-pulse">Trending</span> Posts
         </h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(0, visiblePosts).map((post) => (
               <Link
                  onClick={handleScrollToTop}
                  to={`/posts/post/${post._id}`}
                  key={post.id}
                  className="border rounded-lg overflow-hidden"
               >
                  {/* Image */}
                  <div className="h-[150px] w-full">
                     <img
                        className="h-full w-full object-cover"
                        src={post.photo}
                        alt={post.title}
                     />
                  </div>
                  {/* Details */}
                  <div className="p-4">
                     <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-xs">
                           @{post.username}
                        </p>
                        <div className="flex justify-end items-center gap-x-2">
                           <p className="text-gray-500 text-xs">{post.date}</p>
                           <p className="text-gray-500 text-xs">{post.time}</p>
                        </div>
                     </div>

                     <h1 className="font-bold text-xl mt-1">{post.title}</h1>
                     <p className="text-gray-700 text-sm mt-1">
                        {truncateText(post.description, 40)}
                     </p>
                     {/* Categories */}
                     <div className="flex items-center gap-x-2 mt-2">
                        {JSON.parse(post.categories).map((category, index) => (
                           <span
                              key={index}
                              className="bg-gray-500 text-xs py-1 px-2 rounded-md text-white font-semibold"
                           >
                              {category}
                              {console.log(category)}
                           </span>
                        ))}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
         {/* See More Button */}
         <div className="flex justify-center mt-5">
            <button
               onClick={loadMorePosts}
               className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
               See More
            </button>
         </div>
      </div>
   );
};

export default TrendingPosts;
