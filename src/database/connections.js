import mongoose from "mongoose";
import { env } from "../../config/index.js";

export const databaseConnection = async () => {
  try {
    await mongoose.connect(env.mongo_url);
    console.log("connected to database");
  } catch (error) {
    console.log(error.message);
  }
};
