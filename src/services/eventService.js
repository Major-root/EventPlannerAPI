const Event = require("../database/models/eventModel");
const AppError = require("../utils/appError");
// const fileUpload = require("../utils/fileUpload");

exports.createEvent = async (req) => {
  const {
    eventTitle,
    eventDate,
    eventLocation,
    eventDescription,
    numberOfAttendees,
  } = req.body;
  const event = await Event.create({
    eventOrganizer: req.userId,
    eventTitle,
    eventDate,
    eventLocation,
    eventDescription,
    coverImage: req.imageURL,
    numberOfAttendees,
  });

  return event;
};
