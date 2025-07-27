const yup = require("yup");

const dayValidationSchema = yup.object().shape({
  day: yup.object({
    date: yup.date().typeError("Invalid date format").required("Date required"),
    hours: yup
      .number()
      .required("Hours required")
      .min(1, "Hours min. 1")
      .max(10, "Hours max. 10"),
    place: yup
      .string()
      .required("Place required")
      .oneOf(["Wewnątrz", "Poza"], 'Place "Wewnątrz" or "Poza"')
      .required("'Wewnątrz' or 'Poza' Required"),
    userColor: yup.string().trim().required("User color required"),
    userName: yup
      .string()
      .required("User name required")
      .min(3, "User name min. 3 characters")
      .max(20, "User name max. 20 characters"),
  }),
});

module.exports = dayValidationSchema;
