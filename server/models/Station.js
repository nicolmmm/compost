const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const User = require("./User");

const stationSchema = new Schema({
  stationName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },

  stationDescription: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 600,
  },

  streetNumber: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: "street is required",
    minlength: 1,
    maxlength: 40,
    trim: true,
    unique: false,
  },

  city: {
    type: String,
    required: "city is a required field",
    minlength: 1,
    maxlength: 40,
  },

  postCode: {
    type: Number,
    required: true,
  },

  acceptingWaste: {
    type: Boolean,
    default: false,
  },

  distributingSoil: {
    type: Boolean,
    default: false,
  },

  owner: { type: Schema.Types.ObjectId, ref: "user", require: true },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Station = model("station", stationSchema);

module.exports = Station;
