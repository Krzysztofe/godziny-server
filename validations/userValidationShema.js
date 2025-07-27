const yup = require("yup");

const userValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "min 3 characters")
    .max(20, "max 20 characters"),
  userColor: yup.string().required("required"),
});

module.exports = userValidationSchema;
