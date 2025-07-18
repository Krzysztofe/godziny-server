const monthModel = require("../models/modelCalendarXX");

exports.getMonths = async (req, res) => {
  try {
    const allMonths = await monthModel
      .find({}, { year: 1, month: 1 })
      .sort({ year: -1, month: -1 });

    res.status(200).json(allMonths);
  } catch (err) {
    console.error("Error fetching months:", err);
    res.status(500).json({ message: "Failed to fetch months" });
  }
};

exports.getMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
    const monthDoc = await monthModel.findOne({
      year: parseInt(year),
      month: month.padStart(2, "0"),
    });

    if (!monthDoc) {
      return res.status(404).json({ message: "Month not found" });
    }

    res.status(200).json(monthDoc);
  } catch (error) {
    console.error("Error fetching month:", error);
    res.status(500).json({ message: "Failed to fetch month" });
  }
};

exports.getAllHours = async (req, res) => {
  const { year, month } = req.params;

  try {
    const monthDoc = await monthModel
      .findOne({
        year: parseInt(year),
        month: parseInt(month),
      })
      .select("hours.allHours");

    if (!monthDoc) {
      return res.status(404).json({ message: "Month not found" });
    }

    res.status(200).json({ allHours: monthDoc.hours.allHours });
  } catch (error) {
    console.error("Error fetching allHours:", error);
    res.status(500).json({ message: "Failed to fetch allHours" });
  }
};

exports.postMonth = async (req, res) => {
  const { year, month, allHours } = req.body;


  if (!year || !month || allHours === undefined || allHours === null) {
    return res.status(400).json({ message: "Missing month data" });
  }

  const newMonth = new monthModel({ year, month, hours: { allHours } });
  try {
    const savedMonth = await newMonth.save();
    res.status(201).json(savedMonth);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create month" });
  }
};

// {
//     "year": 2024,
//    "month": 8,
//     "allHours": 130
//    }


exports.patchAllHours = async (req, res) => {
    const { id } = req.params;
    const { allHours } = req.body;
  
    try {
      const updatedMonth = await monthModel.findByIdAndUpdate(
        id,
        { "hours.allHours": allHours },
        { new: true }
      );
  
      if (!updatedMonth) {
        return res.status(404).json({ message: "Month not found" });
      }
  
      res.status(200).json({ message: "allHours updated", updatedMonth });
    } catch (error) {
      console.error("Error updating allHours:", error);
      res.status(500).json({ message: "Failed to update allHours" });
    }
  };



exports.deleteMonth = async (req, res) => {
  const monthId = req.params.id;

  try {
    const monthToDelete = await monthModel.findById(monthId);

    if (!monthToDelete) {
      const error = new Error("Month not found");
      error.statusCode = 404;
      throw error;
    }
    await monthModel.findByIdAndDelete(monthId);

    res.status(200).json({ message: "Month deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
