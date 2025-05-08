const { Joi, celebrate, Segments } = require("celebrate");

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
}

module.exports = PaymentMiddleware;
