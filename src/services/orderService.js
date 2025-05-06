const TicketOrder = require("../database/models/ticketOrderModel");
const TicketCat = require("../database/models/ticketCatModel");
const AppError = require("../utils/appError");

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
  const totalPrice = ticketCat.price * ticketQuantity;
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
