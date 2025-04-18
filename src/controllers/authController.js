const router = require("express").Router();
const authService = require("../services/authService");
const AuthValidatetion = require("../middlewares/authMiddleware");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");
const Email = require("../utils/email");

router.post(
  "/register",
  AuthValidatetion.validateUserRegistration(),
  catchAsync(async (req, res) => {
    const { user, otp } = await authService.registerUser(req);
    await new Email(user, otp).sendVerifyEmail();
    response.success(res, "User registered successfully");
  })
);
router.post(
  "/verifyOTP",
  AuthValidatetion.validateUserOTP(),
  catchAsync(async (req, res) => {
    await authService.verifyOTP(req);
    response.success(res, "User verified successfully");
  })
);

router.post(
  "/login",
  AuthValidatetion.validateUserLogin(),
  catchAsync(async (req, res) => {
    const { user, token } = await authService.login(req);
    response.setCookie(res, req, token);
    response.success(res, "User logged in successfully", { user, token });
  })
);

module.exports = router;
