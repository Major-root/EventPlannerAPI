// const mongoose = require("mongoose");

// const TicketOrderSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is of buyer is required"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is of buyer is required"],
//   },
//   // event: {
//   //   type: mongoose.Schema.ObjectId,
//   //   ref: "Event",
//   //   required: [true, "Event ID is required"],
//   // },
//   ticketDetails: {
//     name: String,
//     price: Number,
//     // quantity: Number,
//   },
//   ticketType: {
//     type: mongoose.Schema.ObjectId,
//     ref: "TicketCat",
//     required: [true, "Ticket type is required"],
//   },
//   ticketQuantity: {
//     type: Number,
//     required: [true, "Ticket quantity is required"],
//   },
//   totalPrice: {
//     type: Number,
//     required: [true, "Total price is required"],
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending",
//   },
// });

// const TicketOrder = mongoose.model("TicketOrder", TicketOrderSchema);
// module.exports = TicketOrder;

const mongoose = require("mongoose");

const TicketItemSchema = new mongoose.Schema(
  {
    ticketType: {
      type: mongoose.Schema.ObjectId,
      ref: "TicketCat",
      required: true,
    },
    ticketName: String,
    ticketPrice: Number,
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { _id: false }
);

// Main TicketOrderSchema
const TicketOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of buyer is required"],
    },
    email: {
      type: String,
      required: [true, "Email of buyer is required"],
    },
    // event: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Event",
    //   required: [true, "Event is required"],
    // },
    tickets: {
      type: [TicketItemSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
      required: [true, "At least one ticket must be included in the order"],
    },
    totalOrderPrice: {
      type: Number,
      required: [true, "Total order price is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const TicketOrder = mongoose.model("TicketOrder", TicketOrderSchema);
module.exports = TicketOrder;
