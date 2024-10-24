import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

const AppContextProvider = (props) => {
   const [user, setUser] = useState(null);
   const backendURL = import.meta.env.VITE_BACKEND_URL;

   // every refresh  ===> refetch data
   const getUser = async () => {
      try {
         const res = await axios.get(backendURL + "/api/auth/refetch", {
            withCredentials: true,
         });
         setUser(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
   }, []);

   const value = {
      backendURL,
      user,
      setUser,
   };

   return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
   );
};

export default AppContextProvider;
