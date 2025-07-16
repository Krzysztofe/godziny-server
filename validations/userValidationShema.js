const yup = require("yup");

const userValidationSchema = yup.object().shape({
  userName: yup.string().min(3).max(20),
  userColor: yup.string().required(),
});

module.exports = userValidationSchema;
