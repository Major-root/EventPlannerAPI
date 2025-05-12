const { Joi, celebrate, Segments } = require("celebrate");

class OrderMiddleware {
  static validateOrder() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        ticketQuantity: Joi.number().integer().min(1).required(),
      }),
      [Segments.PARAMS]: Joi.object().keys({
        ticketType: Joi.string().required(),
      }),
    });
  }
}

module.exports = OrderMiddleware;
