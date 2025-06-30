const express = require("express");
const calendarController = require("../controllers/calendar");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userShema");
const router = express.Router();

router.get("/users", calendarController.getUsers);
router.post("/users", validation(userSchema), calendarController.postUser);
router.delete("/users/:id", calendarController.deleteUser);

module.exports = router;
