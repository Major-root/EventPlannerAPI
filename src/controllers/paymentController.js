const router = require("express").Router();
const paymentService = require("../services/paymentService");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");
const paymentMiddleware = require("../middlewares/paymentMiddleware");

router.post(
  "/initialize",
  paymentMiddleware.initializePayment(),
  catchAsync(async (req, res) => {
    const { reference, authorization_url } =
      await paymentService.initializePayment(req);
    response.success(res, "Payment initialized successfully", {
      reference,
      authorization_url,
    });
  })
);

router.get(
  "/verify/:reference",
  paymentMiddleware.verifyPayment(),
  catchAsync(async (req, res) => {
    await paymentService.verifyPayment(req);
    response.success(
      res,
      "Payment verified successfully, please check your email for your ticket. Thanks"
    );
  })
);
router.post(
  "/webhook",
  (req, res, next) => {
    console.log("Webhook received", req.originalUrl);
    next();
  },
  paymentMiddleware.verifyWebhook(),
  catchAsync(async (req, res) => {
    console.log("Payment webhook received", req.originalUrl);
    await paymentService.verifyPayment(req);
    console.log("Payment verified successfully");
    console.log("Webhook received successfully");
    response.success(res, "Webhook received successfully");
  })
);

module.exports = router;
