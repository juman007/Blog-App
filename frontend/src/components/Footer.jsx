import React from "react";
import { SiMicrodotblog } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="bg-teal-50">
         <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
               <Link
                  to={"/"}
                  className="ml-2 md:ml-0 flex items-center gap-x-2 text-2xl font-bold text-red-500 mb-4 md:mb-0"
               >
                  <p>
                     <SiMicrodotblog />
                  </p>
                  Buletin
               </Link>
               <div className="grid grid-cols-1 gap-8 sm:gap-6 md:grid-cols-3 md:gap-8">
                  <div>
                     <h2 className="mb-6 text-sm font-bold text-black uppercase text-center md:text-left">
                        Pages
                     </h2>
                     <ul className="text-black font-medium text-center md:text-left">
                        <li className="mb-4">
                           <Link to={"#"} className="hover:underline">
                              Home
                           </Link>
                        </li>
                        <li className="mb-4">
                           <Link to={"#"} className="hover:underline">
                              About Us
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 className="mb-6 text-sm font-bold text-black uppercase text-center md:text-left">
                        Follow us
                     </h2>
                     <ul className="text-black font-medium text-center md:text-left">
                        <li className="mb-4">
                           <Link to={"#"} className="hover:underline">
                              Instagram
                           </Link>
                        </li>
                        <li>
                           <Link to={"#"} className="hover:underline">
                              Facebook
                           </Link>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <h2 className="mb-6 text-sm font-bold text-black uppercase text-center md:text-left">
                        Legal
                     </h2>
                     <ul className="text-black font-medium text-center md:text-left">
                        <li className="mb-4">
                           <Link to={"#"} className="hover:underline">
                              Privacy Policy
                           </Link>
                        </li>
                        <li>
                           <Link to={"#"} className="hover:underline">
                              Terms &amp; Conditions
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex justify-center items-center">
               <span className="text-sm text-black text-center">
                  © 2024 Juman Saikia | All Rights Reserved.
               </span>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
