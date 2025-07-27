const validation = (schema) => async (req, res, next) => {
  try {

    console.log("Data for validation:", req.body)
    await schema.validate(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = validation;
