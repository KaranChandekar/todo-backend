import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./data/config.env",
});

// Using middleware
app.use(express.json());

// Using router
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
