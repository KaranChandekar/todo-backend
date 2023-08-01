import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "nodeapi",
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => console.error(err));
};
