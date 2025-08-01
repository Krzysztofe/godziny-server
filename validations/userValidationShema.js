const yup = require("yup");

const userValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("User name required")
    .min(3, "User name min. 3 characters")
    .max(20, "User name max. 20 characters"),
  userColor: yup.string().required("User color required"),
});

module.exports = userValidationSchema;
