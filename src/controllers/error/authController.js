const router = require("express").Router();
const authService = require("../../services/authService");
const AuthValidatetion = require("../../middlewares/authMiddleware");
const catchAsync = require("../../utils/catchAsync");
const { response } = require("../../utils/response");
const Email = require("../../utils/email");

router.post(
  "/register",
  AuthValidatetion.validateUserRegistration(),
  catchAsync(async (req, res) => {
    const { user, otp } = await authService.registerUser(req);

    response(res, "User registered successfully");
  })
);

module.exports = router;

res, (result = null), messsage, (statusCode = 200), (status = "success");
