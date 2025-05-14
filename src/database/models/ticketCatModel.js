const mongoose = require("mongoose");
const TicketCatSchema = new mongoose.Schema({
  ticketCatName: {
    type: String,
    required: [true, "Ticket category name is required"],
    enum: [
      "vip",
      "early bird",
      "regular",
      "group",
      "student",
      "family",
      "corporate",
    ],
  },
  ticketCatPrice: {
    type: Number,
    required: [true, "Ticket category price is required"],
  },
  ticketCatQuantity: {
    type: Number,
    required: [true, "Ticket category quantity is required"],
  },
  ticketSold: {
    type: Number,
    default: 0,
  },
  remaingingTickets: {
    type: Number,
    default: this.ticketCatQuantity,
  },
  ticketCatDescription: {
    type: String,
  },
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: [true, "Event ID is required"],
  },
});

const TicketCat = mongoose.model("TicketCat", TicketCatSchema);
module.exports = TicketCat;
