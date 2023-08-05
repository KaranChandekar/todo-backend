import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/features.js";
import errorHandler from "../utils/errorHandler.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new errorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, 201, "Registered successfully!");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Register first!", 401));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new errorHandler("Invalid credentials!", 401));

    sendCookie(user, res, 200, `Welcome back, ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ success: true, message: "Logged out!" });
};
