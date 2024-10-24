import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { SiMicrodotblog } from "react-icons/si";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
   // APP Context
   const { user } = useContext(AppContext);

   return (
      <div className="bg-white shadow-md fixed top-0  w-full h-14">
         <div className="w-full h-full  md:w-[80%] m-auto flex justify-between items-center ">
            <Link
               to={"/"}
               className="ml-2 md:ml-0 flex items-center gap-x-2 text-2xl font-bold text-red-500"
            >
               <p>
                  <SiMicrodotblog />
               </p>
               Buletin{" "}
            </Link>
            <div className=" items-center md:flex hidden">
               <input
                  className="border outline-none rounded-l-md pl-3 py-1 w-[300px]"
                  type="text"
                  placeholder="Search..."
               />
               <button className="bg-red-500 py-2 px-2 text-white rounded-r-md ">
                  <BiSearch className="text-lg" />
               </button>
            </div>

            <div className="flex items-center gap-x-2 mr-2 md:mr-0">
               {user ? (
                  <Link
                     className="bg-black text-white py-2 px-4 text-sm"
                     to={"/write"}
                  >
                     Write
                  </Link>
               ) : (
                  <Link
                     className=" border border-black text-black py-2 px-3 rounded-xl text-sm font-semibold hover:bg-black hover:text-white transition-all duration-500 "
                     to={"/login"}
                  >
                     Sign in
                  </Link>
               )}
               {user ? (
                  <Link to={"/profile"}>
                     <div className="border border-blue-500 border-1 w-10 h-10 rounded-full">
                        <img
                           className="object-cover rounded-full "
                           src="logo1"
                           alt=""
                        />
                     </div>
                  </Link>
               ) : (
                  <Link
                     className="bg-red-500 text-white py-2 px-3 rounded-xl text-sm font-semibold hover:bg-red-600"
                     to={"/register"}
                  >
                     Sign up
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
