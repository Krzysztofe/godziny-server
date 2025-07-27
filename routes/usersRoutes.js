const express = require("express");
const usersController = require("../controllers/usersControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const userExistValidation = require("../validations/userExistValidation")

router.get("/", isAuth, usersController.getUsers);
router.post("/", isAuth, validation(userSchema), userExistValidation, usersController.postUser);
router.delete("/:id", isAuth, usersController.deleteUser);

module.exports = router;
