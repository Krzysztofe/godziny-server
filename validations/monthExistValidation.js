const monthModel = require("../models/modelMonth"); 

const monthExistValidation = async (req, res, next) => {
  const { month, year } = req.body;

  try {
    const existing = await monthModel.findOne({ month, year });

    if (existing) {
      return res.status(400).json({
        error: `Month ${month} of year ${year} exists in the database.`,
      });
    }

    next(); 
  } catch (err) {
    console.error("Error checking existing month:", err);
    res.status(500).json({ error: "Internal server error during validation." });
  }
};

module.exports = monthExistValidation;
