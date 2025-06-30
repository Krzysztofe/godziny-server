const express = require("express");
const calendarController = require("../controllers/calendar");
const validateUser = require("../validations/validationUser");
const userSchema = require("../validations/userShema");
const router = express.Router();

router.get("/users", calendarController.getUsers);
router.post("/users", validateUser(userSchema), calendarController.postUser);
router.delete("/users/:id", calendarController.deleteUser);

module.exports = router;
