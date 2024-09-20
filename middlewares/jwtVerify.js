import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const jwtVerify = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
   
    

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized access!",
      });
    } else {
      jwt.verify(token, process.env.Access_token_secret, (error, decode) => {
        if (error) {
          return res.json({
            success: false,
            message: "Invalid token!",
          });
        }

        req.user = decode._id;
        next(); 
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while verifying JSON web token!",
    });
  }
};

export const isAdmin = async (req, res,next) => {
  try {
    const currUser = req.user;
    const user = await User.findOne({ currUser }).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "Can't found user ",
      });
    }
    if (user.role !== 1) {
      return res.json({
        success: false,
        message: "You are not admin",
      });
    }
    else{
      next();
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while decide admin",
    });
  }
};
