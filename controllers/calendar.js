const users = require("../models/modelsUsers");

exports.getUsers = (req, res, next) => {
  res.status(200).json(users);
};

exports.postUser = (req, res, next) => {
  const respUser = req.body;

  const newUser = {
    id: new Date().toISOString(),
    userColor: respUser.userColor,
    userName: respUser.userName,
  };

  users.push(newUser);

  users.sort((a, b) =>
    a.userName.localeCompare(b.userName, undefined, { sensitivity: "base" })
  );
  res.status(201).json(newUser);
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  const userIdx = users.findIndex(user => user.id === userId);

  if (userIdx === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIdx, 1);
  
  res.status(200).json({ message: "User deleted" });
  console.log("delete", userId);
};
