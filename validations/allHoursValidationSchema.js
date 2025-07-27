const yup = require("yup");

const allHoursValidationSchema = yup.object().shape({
  allHours: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? parseFloat(originalValue) : value
    )
    .min(0, "All hours min 0")
    .max(320, "All hours max. 320")
    .required("All hours required"),
});
module.exports = allHoursValidationSchema;
