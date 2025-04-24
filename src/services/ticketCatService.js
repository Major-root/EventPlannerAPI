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
