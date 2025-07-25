const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const cors = require("./middlewares/cors");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const helmet = require("helmet");
const compression = require("compression");

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors);

// routes
// app.use("/", (req, res) => res.status(200).json("Godziny app"));
app.use("/", authRoutes);
app.use("/hours", usersRoutes);
app.use("/calendar", calendarRoutes);

app.use(errorHandler);
// app.use(notFound);

module.exports = app;
