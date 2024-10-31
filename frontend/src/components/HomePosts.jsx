import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loader1 from "./loader/Loader1";
import Loarder from "./Loarder";

const HomePosts = () => {
   const { search } = useLocation();
   const [posts, setPosts] = useState([]);
   const [noResults, setNoResults] = useState(false);
   const [loader, setLoader] = useState(false);

   // API context
   const { backendURL } = useContext(AppContext);

   const fetchPosts = async () => {
      setLoader(true);
      try {
         const { data } = await axios.get(
            `${backendURL}/api/post/all-post/${search}`
         );

         setPosts(data.posts);
         setLoader(false);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      fetchPosts();
   }, [search]);

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

   // Conditional rendering for post
   if (loader) {
      return (
         <div className="mt-20 min-h-[10vh] flex justify-center items-center">
            <Loader1 />
         </div>
      ); // Show loading state while fetching post
   }

   return (
      <div className="px-1 h-auto flex flex-col md:flex-row mt-10  top-section-responsive">
         {loader && <Loarder />}
         {noResults && <p>No results found.</p>}
         {!loader && !noResults && posts.length > 0 && (
            <>
               {/* Display the first post */}
               <Link
                  onClick={handleScrollToTop}
                  to={`/posts/post/${posts[0]._id}`}
                  className="w-full md:w-1/2 h-full"
               >
                  <div className="w-full h-[300px]">
                     <img
                        className="w-full h-full object-cover top-sec-img"
                        src={posts[0].photo}
                        alt=""
                     />
                  </div>
                  <div>
                     <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-500 text-xs">
                           @{posts[0].username}
                        </p>
                        <div className="flex justify-end items-center gap-x-2">
                           <p className="text-gray-500 text-xs">
                              {posts[0].date}
                           </p>
                           <p className="text-gray-500 text-xs">
                              {posts[0].time}
                           </p>
                        </div>
                     </div>
                     <h1 className="font-bold text-2xl mt-1">
                        {posts[0].title}
                     </h1>
                     <p className="text-sm mt-2 text-justify">
                        {truncateText(posts[0].description, 100)}{" "}
                        {/* Ensure posts[0].text is defined */}
                     </p>
                  </div>
               </Link>

               {/* Display the next two posts */}
               <div className="w-full md:w-1/2 h-full flex flex-col gap-10 md:gap-5 mt-20 md:mt-0">
                  {posts.slice(1, 4).map((post) => (
                     <Link
                        onClick={handleScrollToTop}
                        to={`/posts/post/${post._id}`}
                        key={post.id}
                        className="md:w-[96%] h-[150px] flex ml-0 md:ml-5"
                     >
                        <div className="border w-[300px] h-full">
                           <img
                              className="w-full h-full object-cover"
                              src={post.photo}
                              alt={post.title}
                           />
                        </div>
                        <div className="w-full h-full ml-2">
                           <div className="flex justify-between items-center">
                              <p className="text-gray-500 text-xs">
                                 @{post.username}
                              </p>
                              <div className="flex justify-end items-center gap-x-2">
                                 <p className="text-gray-500 text-xs">
                                    {post.date}
                                 </p>
                                 <p className="text-gray-500 text-xs">
                                    {post.time}
                                 </p>
                              </div>
                           </div>
                           <h1 className="font-bold text-2xl mt-1  top-sec-heading">
                              {post.title}
                           </h1>
                           <div className="flex items-center gap-x-2 mt-2">
                              {JSON.parse(post.categories).map(
                                 (category, index) => (
                                    <span
                                       key={index}
                                       className="bg-gray-500 text-xs py-1 px-2 rounded-md text-white font-semibold"
                                    >
                                       {category}
                                    </span>
                                 )
                              )}
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </>
         )}
      </div>
   );
};

export default HomePosts;
