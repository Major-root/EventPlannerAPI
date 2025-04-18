const multer = require("multer");
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

// implemetn image upload using multer and upload to s3 bucket or cloudinary

exports.createEvent = async (req) => {
  const {
    eventTitle,
    eventDate,
    eventLocation,
    eventDescription,
    coverImage,
    numberOfAttendees,
  } = req.body;
  // eventUrl
  const event = await Event.create({
    eventOrganizer: req.userId,
    eventTitle,
    eventDate,
    eventLocation,
    eventDescription,
    coverImage,
    numberOfAttendees,
  });

  return event;
};
