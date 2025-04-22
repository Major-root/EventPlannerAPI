const router = require("express").Router();
const EventService = require("../services/eventService");
const catchAsync = require("../utils/catchAsync");
const response = require("../utils/response");
const uploadImage = require("../utils/fileUpload");
const EventValidation = require("../middlewares/eventMiddleware");
const Email = require("../utils/email");
const guard = require("../middlewares/guard");

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

module.exports = router;
