const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DATABASE_URL = process.env.DB_URL.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
