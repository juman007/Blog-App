import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   // APP Context
   const { setUser, backendURL } = useContext(AppContext);

   const navigate = useNavigate();

   const loginHandler = async () => {
      try {
         const res = await axios.post(
            backendURL + "/api/auth/login",
            {
               email,
               password,
            },
            { withCredentials: true }
         );

         if (res.data.success) {
            toast.success(res.data.message);
            setUser(res.data);
            navigate("/");
            window.location.reload();
         } else {
            toast.error(res.data.message);
         }
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
      }
   };

   return (
      <>
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
            <div className="border shadow-2xl rounded-xl p-10 w-[90%] sm:w-[50%] lg:w-[30%] bg-white flex flex-col space-y-6">
               <h1 className="text-center font-extrabold text-3xl text-gray-800">
                  Login
               </h1>

               <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg outline-none w-full text-sm px-4 py-3 border-gray-300"
                  type="email"
                  placeholder="Your email"
               />

               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg outline-none w-full text-sm px-4 py-3 border-gray-300"
                  type="password"
                  placeholder="Password"
               />

               <button
                  onClick={loginHandler}
                  className="w-full bg-[#f8674d] text-white font-bold py-3 rounded-lg hover:bg-[#e2573b] transition-all duration-300"
               >
                  Login
               </button>

               <p className="w-full text-sm text-gray-500">
                  Create a new account?{" "}
                  <Link
                     className="text-[#f8674d] font-semibold hover:underline"
                     to={"/register"}
                  >
                     Click here
                  </Link>
               </p>
            </div>
         </div>
      </>
   );
};

export default Login;
