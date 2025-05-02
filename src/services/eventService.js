const Event = require("../database/models/eventModel");
const TicketCat = require("../database/models/ticketCatModel");
const slug = require("slug");
const AppError = require("../utils/appError");
// const fileUpload = require("../utils/fileUpload");

//  HANDLE DATETIME FORMATS

exports.createEvent = async (req) => {
  const {
    eventTitle,
    startDate,
    endDate,
    locationAddress,
    eventLocation,
    eventDescription,
    numberOfAttendees,
    startTime,
    endTime,
  } = req.body;
  const slugTitle = slug(eventTitle, { lower: true });
  const param = `${slugTitle}-${Date.now()}`;
  const eventURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/event/${param}}`;
  const event = await Event.create({
    eventOrganizer: req.user._id,
    eventTitle,
    startDate: `${startDate}T${startTime}:00Z`,
    endDate: `${endDate}T${endTime}:00Z`,
    locationAddress,
    eventLocation,
    eventDescription,
    coverImage: req.imageURL,
    numberOfAttendees,
    eventURL,
    slug: `${param}`,
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

exports.getEventByURL = async (req) => {
  const { slugParam } = req.params;
  const event = await Event.findOne({ slug: slugParam }).populate(
    "ticketCategories",
    "ticketCatName ticketCatPrice ticketCatQuantity"
  );

  return event;
};
