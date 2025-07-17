const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  date: { type: String, required: true }, 
  hours: Number,
  place: String,
  userColor: String,
  userName: String,
});

const MonthSchema = new Schema({
  year: { type: Number, required: true },
  month: { type: String, required: true }, 
  calcHours: {
    allHours: { type: Number, required: true },
    currentHours: Number,
    acceptedHours: Number,
    rejectedHours: Number,
    submittedHours: Number,
  },
  columns: {
    submitted: [DaySchema],
    accepted: [DaySchema],
    rejected: [DaySchema],
  },
});

module.exports = mongoose.model("MonthSchema", MonthSchema);
