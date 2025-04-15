const { Joi, celebrate, Segment } = require("celebrate");

class AuthValidatetion {
  static validateUserRegistration() {
    return celebrate({
      [Segment.BODY]: Joi.object().keys({
        name: Joi.string().required().label("name"),
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password"),
      }),
    });
  }

  static validateUserLogin() {
    return celebrate({
      [Segment.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    });
  }
}

module.exports = AuthValidatetion;
