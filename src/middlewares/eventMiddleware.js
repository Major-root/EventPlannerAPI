const { Joi, Segments, celebrate } = require("celebrate");

class EventValidation {
  static validateCreateEvent() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        eventTitle: Joi.string().required(),
        eventDate: Joi.date().required(),
        eventLocation: Joi.string().required(),
        eventDescription: Joi.string().required(),
        numberOfAttendees: Joi.number().required(),
      }),

      // [Segments.FILES]: Joi.object().keys({
      //   image: Joi.object({
      //     fieldname: Joi.string().required(),
      //     originalname: Joi.string().required(),
      //     encoding: Joi.string().required(),
      //     mimetype: Joi.string()
      //       .valid("image/jpeg", "image/png", "image/jpg", "image/webp")
      //       .required(),
      //     buffer: Joi.any(),
      //     size: Joi.number()
      //       .max(5 * 1024 * 1024)
      //       .required(), // Max 5MB
      //   }).required(),
      // }),
    });
  }

  static validateUpdateEvent() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object().keys({
        eventTitle: Joi.string().optional(),
        eventDate: Joi.date().optional(),
        eventLocation: Joi.string().optional(),
        eventDescription: Joi.string().optional(),
        numberOfAttendees: Joi.number().optional(),
      }),
    });
  }
}

module.exports = EventValidation;
