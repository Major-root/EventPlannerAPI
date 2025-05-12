const TicketCat = require("../database/models/ticketCatModel");
const Event = require("../database/models/eventModel");
const AppError = require("../utils/appError");

exports.createTicketCat = async (req) => {
  const { ticketCatName, ticketCatPrice, ticketCatQuantity } = req.body;
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    throw new AppError("Event not found", 404);
  }
  const ticketCat = await TicketCat.create({
    ticketCatName,
    ticketCatPrice,
    ticketCatQuantity,
    remaingingTickets: ticketCatQuantity,
  });
  event.ticketCategories.push(ticketCat._id);
  await event.save();
  return ticketCat;
};

exports.createAllTicketCat = async (req) => {
  const { items } = req.body;
  const event = await Event.findById(req.params.eventId).populate(
    "ticketCategories",
    "ticketCatName"
  );
  if (!event) {
    throw new AppError("Event not found,  ticket must belong to an event", 404);
  }
  if (event.ticketCategories.length > 0) {
    const existing = items.some((item) =>
      event.ticketCategories.some(
        (cat) => cat.ticketCatName === item.ticketCatName.toLowerCase()
      )
    );
    if (existing) {
      throw new AppError("Ticket category already exists", 400);
    }
  }
  const totalTickets = items.reduce(
    (acc, item) => acc + item.ticketCatQuantity,
    0
  );
  if (totalTickets + event.totalTicketCreated > event.numberOfAttendees) {
    throw new AppError(
      "Total tickets cannot be greater than number of attendees, Please do the math",
      400
    );
  }
  const ticketCats = await Promise.all(
    items.map(async (item) => {
      const ticketCat = await TicketCat.create({
        ticketCatName: item.ticketCatName.toLowerCase(),
        ticketCatPrice: item.ticketCatPrice,
        ticketCatQuantity: item.ticketCatQuantity,
        remaingingTickets: item.ticketCatQuantity,
        eventId: event._id,
      });
      return ticketCat;
    })
  );
  event.ticketCategories.push(...ticketCats.map((cat) => cat._id));
  event.totalTicketCreated += totalTickets;
  await event.save();
  return ticketCats;
};
