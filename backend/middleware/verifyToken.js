import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
   try {
      // Access the token from cookies
      const token = req.cookies.token;

      // If no token is found
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "You are not authenticated!",
         });
      }

      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
         if (err) {
            return res.status(403).json({
               success: false,
               message: "Invalid or expired token!",
            });
         }

         // Store the user information in the request for future use
         req.userId = data.id;
         next();
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: "Something went wrong!",
      });
   }
};

export default verifyToken;
