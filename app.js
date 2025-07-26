const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const calendarRoutes = require("./routes/monthsRoutes");
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
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/months", calendarRoutes);
app.get("/", (req, res) => {
  res.send("Serwer godziny");
});

app.use(errorHandler);
// app.use(notFound);

module.exports = app;
