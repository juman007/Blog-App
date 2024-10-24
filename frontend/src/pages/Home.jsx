import React from "react";
import HomePosts from "../components/HomePosts";
import TrandingPosts from "../components/TrandingPosts";
import AppDownload from "../components/AppDownload";

const Home = () => {
   return (
      <>
         <div className="mt-24 md:px-[200px] ">
            <div className="bg-[#F5F5F5] w-full h-48 rounded-xl flex flex-col items-center justify-center">
               <h4 className="text-gray-500 tracking-[4px] text-xs md:text-[16px] font-bold mb-2">
                  WELCOME TO BULETIN
               </h4>
               <h3 className="text-black text-center text-xl md:text-3xl font-bold mb-2">
                  Craft narratives✍️that igite{" "}
                  <span className="text-red-500">inspiration</span>💡,
               </h3>
               <h3 className="text-black text-center text-xl md:text-3xl font-bold">
                  <span className="text-red-500">knowledge</span>📙, and{" "}
                  <span className="text-red-500">entertainment</span>🎬
               </h3>
            </div>

            <HomePosts />
            <TrandingPosts />
            <AppDownload />
         </div>
      </>
   );
};

export default Home;
