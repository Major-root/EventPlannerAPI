const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const appRouter = require("./route");
const catchAsync = require("./src/utils/catchAsync");
const errorController = require("./src/controllers/error/error");

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

appRouter(app);

app.use((req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found in my server`, 400));
});

app.use(errorController);

module.exports = app;
