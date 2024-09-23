import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

// verify JWT 
export const jwtVerify = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // If no access token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! No access token provided.",
      });
    }

    // Verify the access token
    jwt.verify(token, process.env.Access_token_secret, (error, decode) => {
      if (error) {
        // If access token is expired, try to renew it using the refresh token
        if (error.name === "TokenExpiredError") {
          return renewToken(req, res, next, refreshToken);
        }
        return res.status(401).json({
          success: false,
          message: "Invalid access token!",
        });
      }

      // If access token is valid
      req.user = decode._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while verifying access token!",
    });
  }
};

//  token renewal
const renewToken = async (req, res, next, refreshToken) => {
  try {
    // Check if the refresh token is present
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access! No refresh token provided.",
      });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.Refresh_token_secret, async (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token! Please login again.",
        });
      }

      // Find the user with the decoded ID from the refresh token
      const user = await User.findById(decode._id).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }

      // If user exists, generate a new access token
      const newAccessToken = jwt.sign(
        { _id: user._id },
        process.env.Access_token_secret,
        { expiresIn: "15m" } // Access token expiration time
      );

      // Set the new access token in the cookies
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Continue with the next middleware
      req.user = user._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while renewing the token!",
    });
  }
};

// admin
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Access denied! Admins only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while verifying admin status!",
    });
  }
};
