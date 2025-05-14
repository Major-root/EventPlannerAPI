const TicketOrder = require("../database/models/ticketOrderModel");
const TicketCat = require("../database/models/ticketCatModel");
const AppError = require("../utils/appError");

// Before creating an order, we need to check if the event is still ongoing

exports.createOrder = async (req) => {
  const { name, email, ticketQuantity } = req.body;
  const { ticketType } = req.params;

  const ticketCat = await TicketCat.findById(ticketType);
  if (!ticketCat) {
    throw new AppError("Ticket type not found", 404);
  }
  const ticketDetails = {
    name: ticketCat.name,
    price: ticketCat.price,
  };
  const totalPrice = ticketCat.ticketCatPrice * ticketQuantity;
  const newOrder = await TicketOrder.create({
    name,
    email,
    ticketDetails,
    ticketType,
    ticketQuantity,
    totalPrice,
  });
  return newOrder;
};

exports.createTicketOrder = async (req, res) => {
  const { name, email, tickets } = req.body;

  if (!tickets || tickets.length === 0) {
    throw new AppError("No tickets provided", 400);
  }

  let totalOrderPrice = 0;
  const ticketItems = [];

  for (const item of tickets) {
    const ticketCat = await TicketCat.findById(item.ticketType).populate(
      "eventId",
      "eventName eventDate"
    );
    if (ticketCat.eventId.eventDate < Date.now()) {
      throw new AppError(
        `Cannot create order for ${ticketCat.ticketCatName}, event has already passed`,
        400
      );
    }
    if (!ticketCat) {
      throw new AppError("Ticket category not found", 400);
    }

    const quantity = item.quantity;
    const ticketPrice = ticketCat.ticketCatPrice;
    const ticketName = ticketCat.ticketCatName;
    const totalPrice = quantity * ticketPrice;

    totalOrderPrice += totalPrice;
    if (quantity > ticketCat.remaingingTickets) {
      throw new AppError(
        `Not enough tickets available for ${ticketName}, only ${ticketCat.remaingingTickets} left`,
        400
      );
    }
    ticketCat.remaingingTickets -= quantity;
    ticketCat.ticketSold += quantity;
    await ticketCat.save();

    ticketItems.push({
      ticketType: ticketCat._id,
      ticketName,
      ticketPrice,
      quantity,
      totalPrice,
    });
  }

  const newOrder = await TicketOrder.create({
    name,
    email,
    // event: eventId,
    tickets: ticketItems,
    totalOrderPrice,
  });

  return newOrder;
};
