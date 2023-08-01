import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Login first!" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

  req.user = await User.findById(decodedToken._id);

  next();
};
