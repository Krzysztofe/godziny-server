const users = [
  { id: new Date().toISOString(), userColor: "#d546dd", userName: "name" },
  { id: new Date().toISOString(), userColor: "#d546dd", userName: "nameccc" },
];

exports.getPosts = (req, res, next) => {
  res.status(200).json(users);
};

exports.postPost = (req, res, next) => {
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
