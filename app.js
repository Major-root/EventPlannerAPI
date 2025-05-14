const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const appRouter = require("./route");
const catchAsync = require("./src/utils/catchAsync");
const errorController = require("./src/controllers/error/error");
const AppError = require("./src/utils/appError");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Event Ticketing API",
  });
});

appRouter(app);

app.use((req, res, next) => {
  next(new AppError(`${req.originalUrl} is not found in my server`, 400));
});

app.use(errorController);

module.exports = app;
