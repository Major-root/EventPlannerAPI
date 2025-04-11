exports.response = (
  res,
  result = null,
  messsage,
  statusCode = 200,
  status = "success"
) => {
  res.status(statusCode).json({
    data: {
      status,
      result,
      messsage: messsage,
    },
  });
};

exports.setCookie = (res, req, token) => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
};
