const User = require("../database/models/userModel");
const Security = require("../database/models/securtityModel");
const helper = require("../utils/helper");
const encryption = require("../utils/encryption");

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
