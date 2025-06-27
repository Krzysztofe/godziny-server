const express = require("express");
const calendarController = require("../controllers/calendar");

const router = express.Router();

router.get("/", calendarController.getPosts);
router.post("/", calendarController.postPost);

module.exports = router;
