const modelUser = require("../models/modelUser");

const userExistValidation = async (req, res, next) => {
  const { userColor, userName } = req.body;

  try {
    const existing = await modelUser.findOne({ userColor, userName });

    if (existing) {
      return res.status(400).json({
        error: `User ${userName} of color ${userColor} exists in the database.`,
      });
    }

    next();
  } catch (err) {
    console.error("Error checking existing month:", err);
    res.status(500).json({ error: "Internal server error during validation." });
  }
};

module.exports = userExistValidation;
