const mongoose = require("mongoose");
const slug = require("slug");
const slug = require("slugify");

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: [true, "Event name is required"],
  },
  eventDate: {
    type: Date,
    required: [true, "Event date is required"],
  },
  eventLocation: {
    type: String,
    required: [true, "Event location is required"],
  },
  eventDescription: {
    type: String,
    required: [true, "Event description is required"],
  },
  eventOrganizer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Event organizer is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Event cover image is required"],
  },
  eventUrl: {
    type: String,
    required: [true, "Event URL is required"],
  },
  slug: {
    type: String,
    required: [true, "Event slug is required"],
  },
  numberOfAttendees: {
    type: Number,
    default: 0,
  },
  ticketCategories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "TicketCat",
    },
  ],
});

EventSchema.pre("save", function (next) {
  if (this.isNew) {
    this.slug = slug(this.eventName, { lower: true });
    this.eventUrl = `${this.slug}-${this._id}`;
  }
  next();
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
