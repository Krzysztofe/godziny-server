const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes")
const calendarRoutes = require("./routes/usersRoutes");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(bodyParser.json());
app.use(cors);
app.use("/", authRoutes);
app.use("/hours", calendarRoutes);

app.use(errorHandler);
// app.use(notFound);

module.exports = app;
