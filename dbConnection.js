require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connectDB = async () => {
  // check if the connection is already open
  if (mongoose.connection.readyState >= 1) {
    console.log("Reusing MongoDB connected");
    return;
  }

  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/lab5"
    );
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
