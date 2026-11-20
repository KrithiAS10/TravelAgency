import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel_agency",
  );

  console.log("MongoDB connected successfully");

  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}
