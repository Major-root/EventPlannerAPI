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
      const hash = crypto
        .createHmac("sha512", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");
      if (hash == req.headers["x-paystack-signature"]) {
        console.log("Webhook hash verified");
        return next();
      } else {
        throw new AppError("Invalid IP address", 403);
      }
    };
  }
}

module.exports = PaymentMiddleware;
