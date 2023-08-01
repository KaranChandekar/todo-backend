import express from "express";
import {
  registerUser,
  getAllUsers,
  getMyProfile,
  loginUser,
  logoutUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logoutUser);

export default router;
