import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// for register
export const signup = async (req, res) => {
  try {
    const { profileImage, userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required",
      });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = await User.create({
      profileImage,
      userName: userName.replace(/\s+/g, ''),
      email:email.toLowerCase(),
      password: hash,
    });
    await user.save()

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Successfully registered!",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while signing up",
    });
  }
}
// for login
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "email is required ",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "password is required ",
      });
    }
    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res.json({
        success: false,
        message: "The user does not exists! ",
      });
    }

    const match = await bcrypt.compare(password, existsUser.password);
    const user = await User.findById(existsUser._id).select("-password");

    if (match) {
      const accessTokenSecret = process.env.Access_token_secret;
      const accessTokenExpiry = process.env.Access_token_expiry;
      const refreshTokenSecret = process.env.Refresh_token_secret;
      const refreshTokenExpiry = process.env.Refresh_token_expiry;

      const accessToken = jwt.sign({ _id: existsUser._id }, accessTokenSecret, {
        expiresIn: accessTokenExpiry,
      });
      const refreshToken = jwt.sign(
        { _id: existsUser._id },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiry }
      );
      res.cookie("accessToken", accessToken, {
        maxAge: 30000,
        httpOnly: true,
        secure: true,
        sameSite: "None"
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1800000,
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      return res.json({
        success: true,
        message: "Successfully signed in!",
        data: user,
        accessToken:accessToken
      });
    } else {
      return res.json({
        success: false,
        message: "Passwords do not match!",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Error while signin!",
    });
  }
};
