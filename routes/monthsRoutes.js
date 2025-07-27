const express = require("express");
const calendarController = require("../controllers/monthsControllers");
const validation = require("../middlewares/validation");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const allHoursValidationSchema = require("../validations/allHoursValidationSchema.js");
const dayValidationSchema = require("../validations/dayValidationShema.js");
const monthExistValidation = require("../validations/monthExistValidation.js");
const dayExistValidation = require("../validations/dayExistValidation.js")

router.get("/", isAuth, calendarController.getMonths);
router.get("/:year/:month", isAuth, calendarController.getMonth);
router.get("/:year/:month/allHours", isAuth, calendarController.getAllHours);

router.post("/", isAuth, monthExistValidation, calendarController.postMonth);

router.patch(
  "/:year/:month",
  isAuth,
  validation(dayValidationSchema),
  dayExistValidation,
  calendarController.patchDay
);
router.patch("/month/:year/:month", isAuth, calendarController.patchMonth);
router.patch(
  "/:id",
  isAuth,
  validation(allHoursValidationSchema),
  calendarController.patchAllHours
);

router.delete("/:id", isAuth, calendarController.deleteMonth);
router.delete("/:year/:month", isAuth, calendarController.deleteDay);

module.exports = router;
