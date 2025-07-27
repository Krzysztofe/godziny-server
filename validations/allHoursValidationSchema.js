const yup = require("yup");

const allHoursValidationSchema = yup.object().shape({
  allHours: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" ? parseFloat(originalValue) : value
    )
    .min(0, "allHours cannot be less than 0")
    .max(320, "allHours cannot be more than 320")
    .required("allHours is required"),
});
module.exports = allHoursValidationSchema;
