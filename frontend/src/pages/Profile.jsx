import React, { useContext, useEffect, useState } from "react";
import userimg from "../assets/patients_icon.svg";
import Loader1 from "../components/loader/Loader1";
import { AppContext } from "../context/AppContext";
import UserPost from "../components/UserPost";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const { user } = useContext(AppContext);
   const [loader, setLoader] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoader(false);
         } catch (error) {
            setLoader(false);
         }
      };

      if (!user) {
         navigate("/");
      }

      fetchData();
   }, [user, navigate]);

   if (loader) {
      return (
         <div className="mt-20 min-h-[80vh] flex justify-center items-center">
            <Loader1 />
         </div>
      );
   }

   return (
      <div className="mt-20 mb-10 flex flex-col items-center">
         <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">
            Welcome
         </h1>

         {/* User Details */}
         <div className="border p-6 rounded-lg shadow-md flex flex-col  items-center gap-4 w-[300px]">
            <img
               src={userimg}
               alt="Profile"
               className="w-32 h-32 object-cover rounded-full border"
            />
            <div className=" flex flex-col justify-center gap-2">
               <p className="text-lg font-medium flex  items-center gap-3">
                  <i className="fa-solid fa-user"></i>
                  <span className="text-blue-500">{user?.data?.username}</span>
               </p>
               <p className="text-lg font-medium flex  items-center gap-3">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  <span className="text-blue-500">{user?.data?.email}</span>
               </p>
            </div>

            <div className="flex justify-center items-center gap-5">
               <button className="bg-green-500 font-semibold text-sm px-3 py-2 text-white rounded-md">
                  Update
               </button>
               <button className="bg-red-500 font-semibold text-sm px-3 py-2 text-white rounded-md">
                  Delete
               </button>
            </div>
         </div>
         <hr className="w-[80%] my-10 border-t-2 border-black" />
         {/* Blog Posts */}
         <div className="w-[80%]">
            <UserPost />
         </div>
      </div>
   );
};

export default Profile;
