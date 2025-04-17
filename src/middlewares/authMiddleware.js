const { Joi, celebrate, Segments } = require("celebrate");

class AuthValidatetion {
  static validateUserRegistration() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().label("name"),
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password"),
      }),
    });
  }

  static validateUserOTP() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        OTP: Joi.string().required().label("OTP"),
      }),
    });
  }

  static validateUserLogin() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    });
  }
}

module.exports = AuthValidatetion;
