const { Joi, Segments, celebrate } = require("celebrate");

class TicketCatValidation {
  static validateCreateTicketCat() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        eventId: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        ticketCatName: Joi.string()
          .lowercase()
          .valid(
            "vip",
            "early bird",
            "regular",
            "group",
            "student",
            "family",
            "corporate"
          )
          .required(),
        ticketCatPrice: Joi.number().required(),
        ticketCatQuantity: Joi.number().required(),
        ticketCatDescription: Joi.string().optional(),
      }),
    });
  }

  static validateAllTicketcat() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        eventId: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        items: Joi.array().items(
          Joi.object().keys({
            ticketCatName: Joi.string()
              .valid(
                "vip",
                "early bird",
                "regular",
                "group",
                "student",
                "family",
                "corporate"
              )
              .required(),
            ticketCatPrice: Joi.number().required(),
            ticketCatQuantity: Joi.number().required(),
          })
        ),
      }),
    });
  }
}

module.exports = TicketCatValidation;
