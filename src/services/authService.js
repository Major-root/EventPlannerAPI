const User = require("../database/models/userModel");
const Security = require("../database/models/securtityModel");
const helper = require("../utils/helper");
const encryption = require("../utils/encryption");
const AppError = require("../utils/appError");
const jwt = require("../utils/jwt");

exports.registerUser = async (req) => {
  const userId = helper.generateUniqueId();
  const { name, email, password } = req.body;
  const hashedPassword = await encryption.hashPassword(password);
  const user = await User.create({
    userId,
    name,
    email,
  });
  const { otp, otpExpireAt } = helper.generateOtp();
  const security = await Security.create({
    userId,
    password: hashedPassword,
    OTP: otp,
    OTPExpire: otpExpireAt,
  });

  return { user, otp };
};

exports.verifyOTP = async (req) => {
  const { OTP } = req.body;

  const user = await Security.findOne({ OTP });

  if (!user) {
    return false;
  }
  return true;
};

exports.login = async (req) => {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user || !encryption.comparePassword(password, user.password)) {
    throw new AppError("Incorrect userName or password");
  }

  const token = jwt.generateToken(user._id);
  return { user, token };
};
