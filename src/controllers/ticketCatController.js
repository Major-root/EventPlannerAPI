const TicketCatService = require("../services/ticketCatService");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");
const TicketCatValidation = require("../middlewares/ticketCatMiddleware");
const guard = require("../middlewares/guard");
const router = require("express").Router();

router.use(guard.protect);
router.post(
  "/createTicketCat/:eventId",
  TicketCatValidation.validateCreateTicketCat(),
  catchAsync(async (req, res) => {
    const ticketCat = await TicketCatService.createTicketCat(req);
    response.success(res, "Ticket category created successfully", {
      ticketCat,
    });
  })
);

router.post(
  "/createAllTicketCat/:eventId",
  TicketCatValidation.validateAllTicketcat(),
  catchAsync(async (req, res) => {
    const ticketCats = await TicketCatService.createAllTicketCat(req);
    response.success(res, "Ticket categories created successfully", {
      ticketCats,
    });
  })
);
router.get(
  "/getTicketCatbyId/:ticketCatId",
  catchAsync(async (req, res) => {
    const ticketCats = await TicketCatService.getTicketCatById(req);
    response.success(res, "Ticket categories retrieved successfully", {
      ticketCats,
    });
  })
);

module.exports = router;
