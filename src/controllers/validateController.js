const router = require("express").Router();
const validateService = require("../services/validateService");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");

router.get(
  "/verify",
  catchAsync(async (req, res) => {
    await validateService.validateTicket(req);
    response.success(res, "Ticket validated successfully");
  })
);

module.exports = router;
