const express = require("express");
const calendarController = require("../controllers/calendar");

const router = express.Router();

router.get("/users",calendarController.getUsers);
router.post("/users", calendarController.postUser);
router.delete("/users/:id", calendarController.deleteUser);

module.exports = router;
