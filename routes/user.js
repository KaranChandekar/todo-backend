import express from "express";
import {
  registerUser,
  getAllUsers,
  getMyProfile,
  loginUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
