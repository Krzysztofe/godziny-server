const modelMonth = require("../models/modelMonth");

const dayExistValidation = async (req, res, next) => {
    const {
      day: { date, userName },
    } = req.body;
    const { year, month } = req.params;
  
    try {
      const existing = await modelMonth.findOne({
        year: parseInt(year),
        month: parseInt(month),
        $or: [
          { "columns.submitted": { $elemMatch: { date, userName } } },
          { "columns.accepted": { $elemMatch: { date, userName } } },
          { "columns.rejected": { $elemMatch: { date, userName } } },
        ],
      });
  
      if (existing) {
        return res.status(400).json({
          error: `User ${userName} already has an entry for ${date} in this month.`,
        });
      }
  
      next();
    } catch (err) {
      console.error("Error checking existing day in month:", err);
      res.status(500).json({ error: "Internal server error during validation." });
    }
  };

module.exports = dayExistValidation;
