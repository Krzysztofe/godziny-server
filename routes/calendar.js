const express = require("express");
const calendarController = require("../controllers/calendar");

const router = express.Router();

router.get( "/users",calendarController.getPosts);
router.post("/users", calendarController.postPost);

module.exports = router;
// http://localhost:3000/godziny/ustawienia