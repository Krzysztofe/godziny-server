const userModel = require("../models/modelUser");

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find().sort({ userName: 1 });
    res.status(200).json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.postUser = async (req, res) => {
  const { userColor, userName } = req.body;

  if (!userColor || !userName) {
    return res.status(400).json({ message: "Missing user name or user color" });
  }

  const newUser = new userModel({ userColor, userName });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userToDelete = await userModel.findById(userId);
    if (!userToDelete) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
