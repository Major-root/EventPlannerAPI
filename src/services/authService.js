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
  const { otp, otpExpireAt } = helper.generateOTP();
  await Security.create({
    userId,
    password: hashedPassword,
    OTP: otp,
    OTPExpire: otpExpireAt,
  });

  return { user, otp };
};

exports.verifyOTP = async (req) => {
  const { OTP } = req.body;

  const security = await Security.findOne({ OTP });

  if (!security) {
    throw new AppError("Invalid OTP", 401);
  }
  const user = await User.findOne({ userId: security.userId });
  user.isVerified = true;
  await user.save({ validateBeforeSave: false });
  return true;
};

exports.login = async (req) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user.isVerified) {
    throw new AppError("User not verified", 401);
  }
  const security = await Security.findOne({ userId: user.userId });

  if (!user || !encryption.comparePassword(password, security.password)) {
    throw new AppError("Incorrect userName or password");
  }

  const token = jwt.generateToken(user._id);
  return { user, token };
};
