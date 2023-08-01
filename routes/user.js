import express from "express";
import {
  registerUser,
  getAllUsers,
  getUserDetails,
  loginUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.route("/userid/:id").get(getUserDetails);

export default router;
