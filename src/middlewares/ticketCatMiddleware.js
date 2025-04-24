const { Joi, Segments, celebrate } = require("celebrate");

class TicketCatValidation {
  static validateCreateTicketCat() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        eventId: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        ticketCatName: Joi.string()
          .valid(
            "VIP",
            "Early Bird",
            "Regular",
            "Group",
            "Student",
            "Family",
            "Corporate"
          )
          .required(),
        ticketCatPrice: Joi.number().required(),
        ticketCatQuantity: Joi.number().required(),
      }),
    });
  }
}

module.exports = TicketCatValidation;
