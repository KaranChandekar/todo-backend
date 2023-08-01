import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import sendCookie from "../utils/features.js";

export const getAllUsers = async (req, res) => {};

export const getUserDetails = async (req, res) => {};

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
    return res.status(404).json({ success: false, error: "Register first!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, error: "Invalid credentials!" });
  }

  sendCookie(user, res, 200, `Welcome back, ${user.name}`);
};
