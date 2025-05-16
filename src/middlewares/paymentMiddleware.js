const { Joi, celebrate, Segments } = require("celebrate");
const secret = process.env.PAYSTACK_SECRET_KEY;
const AppError = require("../utils/appError");
const crypto = require("crypto");

class PaymentMiddleware {
  static initializePayment() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().label("Full name"),
        email: Joi.string().email().required(),
        amount: Joi.number().required(),
        orderId: Joi.string().required(),
      }),
    });
  }

  static verifyPayment() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        reference: Joi.string().required(),
      }),
    });
  }
  static verifyWebhook() {
    return (req, res, next) => {
      console.log("In webhook middleware");
      const allowedIps = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];
      console.log("Webhook IPs:", allowedIps);
      console.log("Webhook IP:", req.headers["x-forwarded-for"]);
      console.log("secret", secret);

      const hash = crypto
        .createHmac("sha512", secret)
        .update(JSON.stringify(req.body));
      if (hash == req.headers["x-paystack-signature"]) {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const cleanIp = ip.replace("::ffff:", "");

        if (allowedIps.includes(cleanIp)) {
          return next();
        } else {
          console.log("Invalid IP address", 403);
          throw new AppError("Invalid IP address", 403);
        }
      }
    };
  }
}

module.exports = PaymentMiddleware;
