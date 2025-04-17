const mongoose = require("mongoose");
// const User = require("./userModel");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Security model must have a user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Security model must have a password"],
  },
  OTP: {
    type: String,
    required: [true, "Security model must have an Otp"],
  },
  OTPExpire: {
    type: Date,
    required: [true, "Security model must have an Otp Expire date"],
  },
});

const Security = mongoose.model("Security", UserSchema);
module.exports = Security;
