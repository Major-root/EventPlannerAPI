const router = require("express").Router();
const EventService = require("../services/eventService");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");
const uploadImage = require("../utils/fileUpload");
const EventValidation = require("../middlewares/eventMiddleware");
const Email = require("../utils/email");
const guard = require("../middlewares/guard");

router.get(
  "find/:slugParam",
  catchAsync(async (req, res) => {
    const event = await EventService.getEventByURL(req);
    response.success(res, "Event retrieved successfully", { event });
  })
);

router.use(guard.protect);
router.use(guard.restrictTo("eventPlanner", "admin"));

router.post(
  "/createEvent",
  EventValidation.validateCreateEvent(),
  uploadImage.uploadImage,
  uploadImage.resizeImage,
  catchAsync(async (req, res) => {
    const event = await EventService.createEvent(req);
    response.success(res, "Event created successfully", { event });
  })
);

router.get(
  "/getAllEvents",
  catchAsync(async (req, res) => {
    const events = await EventService.getAllEvents(req);
    response.success(res, "Events retrieved successfully", { events });
  })
);

router.get(
  "/getEventById/:eventId",
  EventValidation.validateGetEventById(),
  catchAsync(async (req, res) => {
    const event = await EventService.getEventById(req);
    response.success(res, "Event retrieved successfully", { event });
  })
);

router.delete(
  "/deleteEvent/:eventId",
  EventValidation.validateGetEventById(),
  catchAsync(async (req, res) => {
    await EventService.deleteEvent(req);
    response.success(res, "Event deleted successfully");
  })
);

module.exports = router;
