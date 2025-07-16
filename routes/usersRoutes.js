const express = require("express");
const usersController = require("../controllers/usersControllers");
const validation = require("../middlewares/validation");
const userSchema = require("../validations/userValidationShema");
const router = express.Router();

router.get("/users", usersController.getUsers);
router.post("/users", validation(userSchema), usersController.postUser);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
