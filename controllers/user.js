import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/features.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(404)
      .json({ success: false, error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, 201, "Registered successfully!");
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ success: false, message: "Register first!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials!" });
  }

  sendCookie(user, res, 200, `Welcome back, ${user.name}`);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const getAllUsers = async (req, res) => {};
