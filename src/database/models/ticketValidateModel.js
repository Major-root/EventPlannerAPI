const mongoose = require("mongoose");

const TicketValidateSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.ObjectId,
    ref: "TicketCat",
    required: [true, "Ticket ID is required"],
  },
  // eventId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Event",
  //   required: [true, "Event ID is required"],
  // },
  ticketCode: {
    type: String,
    required: [true, "Ticket code is required"],
  },
  ticketQRCode: {
    type: String,
    required: [true, "Ticket QR code is required"],
  },
  ticketStatus: {
    type: String,
    enum: ["valid", "invalid"],
    default: "valid",
  },
});

const Validate = mongoose.model("TicketValidate", TicketValidateSchema);
module.exports = Validate;
