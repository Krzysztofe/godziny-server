const yup = require("yup");

const userSchema = yup.object().shape({
  userName: yup.string().min(3).max(20),
  userColor: yup.string().required(),
});

module.exports = userSchema;
