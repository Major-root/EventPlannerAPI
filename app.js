const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const appRouter = require("./route");
const catchAsync = require("./src/utils/catchAsync");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// const rateLimit = require("express-rate-limit");
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter); // Apply the rate limiting middleware to all requests

app.use(appRouter);

app.use("*", (req, res, next) => {
  res.statusCode(400).json({
    message: "This route not found in my server",
  });
});

app.use((err, req, res, next) => {
  console.log("This is the error message", err);
  res.statusCode(400).json({
    err,
  });
});

module.exports = app;
