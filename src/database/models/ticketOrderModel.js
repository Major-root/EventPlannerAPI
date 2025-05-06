const mongoose = require("mongoose");

const TicketOrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is of buyer is required"],
  },
  email: {
    type: String,
    required: [true, "Email is of buyer is required"],
  },
  // event: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Event",
  //   required: [true, "Event ID is required"],
  // },
  ticketDetails: {
    name: String,
    price: Number,
    // quantity: Number,
  },
  ticketType: {
    type: mongoose.Schema.ObjectId,
    ref: "TicketCat",
    required: [true, "Ticket type is required"],
  },
  ticketQuantity: {
    type: Number,
    required: [true, "Ticket quantity is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
});

const TicketOrder = mongoose.model("TicketOrder", TicketOrderSchema);
module.exports = TicketOrder;
