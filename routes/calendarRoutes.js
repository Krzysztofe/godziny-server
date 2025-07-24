const express = require("express");
const calendarController = require("../controllers/calendarControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.get("/", calendarController.getMonths);
router.get("/:year/:month", calendarController.getMonth);
router.get("/:year/:month/allHours", calendarController.getAllHours);

router.post("/", calendarController.postMonth);

router.patch("/:year/:month", calendarController.patchDay);
router.patch("/month/:year/:month", calendarController.patchMonth);
router.patch("/:id", calendarController.patchAllHours);

router.delete("/:id", calendarController.deleteMonth);
router.delete("/:year/:month", calendarController.deleteDay);

module.exports = router;
