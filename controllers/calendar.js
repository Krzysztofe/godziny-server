const users = require("../models/modelsUsers");

exports.getUsers = (req, res) => {
  res.status(200).json(users);
};

exports.postUser = (req, res) => {
  const reqpUser = req.body;

  const newUser = {
    id: new Date().toISOString(),
    userColor: reqpUser.userColor,
    userName: reqpUser.userName,
  };

  users.push(newUser);

  users.sort((a, b) =>
    a.userName.localeCompare(b.userName, undefined, { sensitivity: "base" })
  );
  res.status(201).json(newUser);
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const userIdx = users.findIndex(user => user.id === userId);

  if (userIdx === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIdx, 1);
  
  res.status(204).json({ message: "User deleted" });
};
