const express = require("express");
const bodyParser = require("body-parser");

const calendarRoutes = require("./routes/calendar");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setDefaultEncoding("Access-Control-Allow-Origin", "*");
  res.setDefaultEncoding(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setDefaultEncoding(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

app.use(calendarRoutes);

app.listen(3000);
