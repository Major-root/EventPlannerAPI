const mongoose = require("mongoose");
const slug = require("slug");
// const slug = require("slugify");

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: [true, "Event name is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Event date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "Event end date is required"],
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "End date must be after start date",
    },
  },
  eventLocation: {
    type: String,
    required: [true, "Event location is required"],
  },
  locationAddress: {
    type: String,
    required: [true, "Event location address is required"],
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
  eventURL: {
    type: String,
    required: [true, "Event URL is required"],
  },
  slug: {
    type: String,
    required: [true, "Event slug is required"],
  },
  numberOfAttendees: {
    type: Number,
    required: [true, "Number of attendees is required"],
    min: [0, "Number of attendees cannot be less than 0"],
    default: 0,
  },
  totalTicketsSold: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  totalTicketCreated: {
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

// EventSchema.pre("save", function (next) {
//   if (this.isNew) {
//     this.slug = slug(this.eventTitle, { lower: true });
//     this.eventUrl = `${this.slug}-${this._id}`;
//   }
//   next();
// });

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
