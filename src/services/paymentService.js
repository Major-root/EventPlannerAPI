const Payment = require("../database/models/paymentModel");
const Order = require("../database/models/ticketOrderModel");
const Validate = require("../database/models/ticketValidateModel");
const TicketCat = require("../database/models/ticketCatModel");
const Email = require("../utils/email");
const helper = require("../utils/helper");
const axios = require("axios");
const { verifyPayment, initializePayment } = require("../utils/payment")(axios);
const crypto = require("crypto");
const secret = process.env.PAYSTACK_SECRET_KEY;

exports.initializePayment = async (req) => {
  const { email, orderId, full_name } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found, please create an order first");
  }

  const amount = order.totalOrderPrice;
  const response = await initializePayment({
    amount: amount * 100,
    email,
    metadata: { orderId, full_name },
  });

  const { reference, authorization_url } = response.data.data;
  const payment = await Payment.create({
    orderId,
    amount,
    currency: "NGN",
    status: "Pending",
    reference,
  });

  return { reference, authorization_url };
};

exports.verifyPayment = async (req) => {
  const reference = req.params?.reference || req.body?.data?.reference;
  const response = await verifyPayment(reference);

  if (response.data.status !== "success") {
    throw new Error("Payment verification failed");
  }

  console.log("Payment verified successfully, updating order status");
  const payment = await Payment.findOneAndUpdate(
    { reference },
    { status: "Completed" },
    { new: true }
  );

  console.log("done with payment update, looking for order");
  const order = await Order.findOneAndUpdate(
    { _id: payment.orderId },
    { status: "Completed" },
    { new: true }
  );

  let allTicketData = [];

  for (const ticketItem of order.tickets) {
    const ticket = await TicketCat.findById(ticketItem.ticketType).populate(
      "eventId"
    );

    for (let i = 0; i < ticketItem.quantity; i++) {
      const ticketCode = helper.generateUniqueId();
      const url = `${req.protocol}://${req.get(
        "host"
      )}${`/api/v1/validate/verify`}?ticketCode=${ticketCode}`;
      const ticketQRCode = await helper.generateTicketQrCode(url);

      await Validate.create({
        ticketId: ticketItem.ticketType,
        ticketCode,
      });

      allTicketData.push({
        ticketCode,
        ticketQRCode,
        eventName: ticket.eventId.eventTitle,
        eventDate: ticket.eventId.startDate,
        eventTime: ticket.eventId.startDate,
        eventVenue: ticket.eventId.eventLocation,
        eventLocation: ticket.eventId.locationAddress,
        ticketType: ticket.ticketCatName,
        userName: order.name,
      });
    }
  }
  console.log("All ticket data:", allTicketData);
  console.log("Sending ticket email to user");

  await new Email(order, allTicketData).sendTicketEmail();
  return;
};
