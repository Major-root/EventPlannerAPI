const Event = require("../database/models/eventModel");
const TicketCat = require("../database/models/ticketCatModel");
const slug = require("slug").default;
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
  const slugTitle = slug(eventTitle, { lower: true });
  const eventURL = `${req.protocol}://${req.get(
    "host"
  )}/events/${slugTitle}-${Date.now()}`;
  const event = await Event.create({
    eventOrganizer: req.user._id,
    eventTitle,
    eventDate,
    eventLocation,
    eventDescription,
    coverImage: req.imageURL,
    numberOfAttendees,
    eventURL,
    slug: slugTitle,
  });

  return event;
};

exports.getAllEvents = async (req) => {
  const events = await Event.find()
    // .populate("eventOrganizer", "firstName lastName email")
    .populate(
      "ticketCategories",
      "ticketCatName ticketCatPrice ticketCatQuantity"
    )
    .sort({ createdAt: -1 });
  return events;
};

exports.getEventById = async (req) => {
  const event = await Event.findById(req.params.eventId).populate(
    "ticketCategories",
    "ticketCatName ticketCatPrice ticketCatQuantity"
  );
  if (!event) {
    throw new AppError("Event not found", 404);
  }
  return event;
};

exports.deleteEvent = async (req) => {
  const event = await Event.findByIdAndDelete(req.params.eventId);
  if (!event) {
    throw new AppError("Event not found", 404);
  }
  await Promise.all(
    event.ticketCategories.forEach(async (ticketCat) => {
      await TicketCat.findByIdAndDelete(ticketCat._id);
    })
  );
  return;
};
