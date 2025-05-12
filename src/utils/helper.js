const uuid = require("uuid");
const crypto = require("crypto");
const qrCode = require("qrcode");

exports.generateUniqueId = () => {
  return uuid.v4();
};

exports.generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpireAt = Date.now() + 5 * 60 * 1000;
  return { otp, otpExpireAt };
};

exports.genUniqueRef = () => {
  const uniqueRef = crypto.randomBytes(10).toString("hex");
  return uniqueRef;
};

exports.generateTicketQrCode = async (data) => {
  try {
    const url = await qrCode.toDataURL(data);
    return url;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
};
