const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: "TicketOrder",
    required: [true, "Order ID is required"],
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  currency: {
    type: String,
    required: [true, "Currency is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  reference: {
    type: String,
    required: [true, "Payment reference is required"],
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
