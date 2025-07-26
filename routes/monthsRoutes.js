const express = require("express");
const calendarController = require("../controllers/monthsControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, calendarController.getMonths);
router.get("/:year/:month", isAuth, calendarController.getMonth);
router.get("/:year/:month/allHours", isAuth, calendarController.getAllHours);

router.post("/", isAuth, calendarController.postMonth);

router.patch("/:year/:month", isAuth, calendarController.patchDay);
router.patch("/month/:year/:month", isAuth, calendarController.patchMonth);
router.patch("/:id", isAuth, calendarController.patchAllHours);

router.delete("/:id", isAuth, calendarController.deleteMonth);
router.delete("/:year/:month", isAuth, calendarController.deleteDay);

module.exports = router;
