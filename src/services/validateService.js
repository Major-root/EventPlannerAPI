const Validate = require("../database/models/ticketValidateModel");
const AppError = require("../utils/appError");

exports.validateTicket = async (req) => {
  const { ticketCode } = req.query;
  if (!ticketCode) {
    throw new AppError("Ticket code is required", 400);
  }
  const ticket = await Validate.findOne({
    ticketCode,
  });
  if (ticket.ticketStatus === "invalid") {
    throw new AppError("Ticket has been used or invalid", 400);
  }
  ticket.ticketStatus = "invalid";
  await ticket.save();
  return;
};
