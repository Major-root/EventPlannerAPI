const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./src/database/index");

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 2025;

connectDB();

const server = app.listen(port, () => {
  console.log(`My event plannner Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
