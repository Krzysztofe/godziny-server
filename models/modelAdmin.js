const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminShema = new Schema({
  adminEmail: { type: String, required: true },
  adminPassword: { type: String, required: true },
  adminName: { type: String, required: true },
});

module.exports = mongoose.model("AdminShema", adminShema);
