const express = require("express");
const bodyParser = require("body-parser");
const calendarRoutes = require("./routes/calendar");
const cors = require("./middlewares/cors");

const app = express();

app.use(bodyParser.json());

app.use(cors);

app.use("/godziny", calendarRoutes);

module.exports = app;

