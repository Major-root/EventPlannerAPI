const { MetadataDirective } = require("@aws-sdk/client-s3");
const Payment = require("../database/models/paymentModel");
const axios = require("axios");
const { verifyPayment, initializePayment } = require("../utils/payment")(axios);

exports.initializePayment = async (req) => {
  const { amount, email, orderId, full_name } = req.body;

  const response = await initializePayment({
    amount: amount * 100,
    email,
    metadata: { orderId, full_name },
  });

  console.log("Response from Paystack:", response.data);

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
  const { reference } = req.params;
  const response = await verifyPayment(reference);

  console.log("Response from Paystack:", response.data);

  if (response.data.status) {
    const payment = await Payment.findOneAndUpdate(
      { reference },
      { status: "Completed" },
      { new: true }
    );

    return;
  } else {
    throw new Error("Payment verification failed");
  }
};
