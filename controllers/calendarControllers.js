const monthModel = require("../models/modelCalendarXX");

exports.getMonth = async (req, res) => {
  const { year, month } = req.params;
};

exports.postMonth = async (req, res) => {
  const { year, month, allHours } = req.body;

  if (!year || !month || !allHours) {
    return res.status(400).json({ message: "Missing month data" });
  }

  const newMonth = new monthModel({ year, month, calcHours: { allHours } });
  try {
    const savedMonth = await newMonth.save();
    res.status(201).json(savedMonth);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create month" });
  }
};

//   {
//     "year": 2024,
//     "month": "08",
//     "allHours": "130"
//   }
