const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
};
