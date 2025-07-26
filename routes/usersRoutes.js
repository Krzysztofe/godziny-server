const express = require("express");
const usersController = require("../controllers/usersControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, usersController.getUsers);
router.post("/", isAuth, validation(userSchema), usersController.postUser);
router.delete("/:id", isAuth, usersController.deleteUser);

module.exports = router;
