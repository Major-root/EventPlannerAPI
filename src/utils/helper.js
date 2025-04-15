const uuid = require("uuid");

exports.generateUniqueId = () => {
  return uuid.v4();
};

exports.generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpireAt = Date.now() + 5 * 60 * 1000;
  return { otp, otpExpireAt };
};
