const express = require("express");
const calendarController = require("../controllers/calendarControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.get("/:year/:month", isAuth, calendarController.getMonth);
router.post("/", calendarController.postMonth);
// router.delete("/users/:id", isAuth, usersController.deleteUser);

module.exports = router;
