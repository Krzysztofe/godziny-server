const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    userColor: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserShema", userShema);
