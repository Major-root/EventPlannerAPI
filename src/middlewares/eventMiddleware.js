const { Joi, Segments, celebrate } = require("celebrate");

class EventValidation {
  static validateCreateEvent() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        eventTitle: Joi.string().required().trim(),
        eventDate: Joi.date().required().greater(Date.now()).messages({
          "date.greater": "Event date must be in the future",
        }),
        eventLocation: Joi.string().required(),
        eventDescription: Joi.string().required(),
        numberOfAttendees: Joi.number().required(),
      }),
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

  static validateGetEventById() {
    return celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        eventId: Joi.string().required(),
      }),
    });
  }
}

module.exports = EventValidation;
