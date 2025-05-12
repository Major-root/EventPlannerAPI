const router = require("express").Router();
const orderService = require("../services/orderService");
const orderMiddleware = require("../middlewares/orderMiddleware");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");

router.post(
  "/create/:ticketType",
  orderMiddleware.validateOrder(),
  catchAsync(async (req, res, next) => {
    const newOrder = await orderService.createOrder(req);
    return response.success(
      res,
      "Order created successfully, please proceed to make your payment",
      newOrder
    );
  })
);

module.exports = router;
