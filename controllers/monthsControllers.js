const monthModel = require("../models/modelCalendar");

// get

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

  const parsedYear = parseInt(year, 10);
  const parsedMonth = parseInt(month, 10);

  if (
    isNaN(parsedYear) ||
    isNaN(parsedMonth) ||
    parsedMonth < 1 ||
    parsedMonth > 12
  ) {
    return res.status(400).json({ message: "Invalid year or month format" });
  }

  try {
    const monthDoc = await monthModel.findOne({
      year: parsedYear,
      month: parsedMonth,
    });

    if (!monthDoc) {
      return res.status(200).json(null);
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
      .select("hours");

    if (!monthDoc) {
      return res.status(404).json({ message: "Month not found" });
    }

    res.status(200).json(monthDoc.hours );
  } catch (error) {
    console.error("Error fetching allHours:", error);
    res.status(500).json({ message: "Failed to fetch allHours" });
  }
};

exports.postMonth = async (req, res) => {
  const { year, month, allHours, currentHours } = req.body;

  if (!year || !month || allHours === undefined || allHours === null) {
    return res.status(400).json({ message: "Missing month data" });
  }

  const newMonth = new monthModel({
    year,
    month,
    hours: {
      allHours,
      currentHours,
      acceptedHours: 0,
      rejectedHours: 0,
      submittedHours: 0,
    },
    columns: {
      submitted: [],
      accepted: [],
      rejected: [],
    },
  });

  try {
    const savedMonth = await newMonth.save();
    res.status(201).json(savedMonth);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create month" });
  }
};

// patch

exports.patchDay = async (req, res) => {
  const { year, month } = req.params;
  const { day, calcHours } = req.body;

  if (!day || !day.date || day.hours == null) {
    return res.status(400).json({ message: "Invalid day data" });
  }

  try {
    const updatedMonth = await monthModel.findOneAndUpdate(
      { year: +year, month: +month },
      {
        $push: { "columns.submitted": day },
        $set: { hours: calcHours },
      },
      { new: true }
    );

    if (!updatedMonth) {
      return res.status(404).json({ message: "Month not found" });
    }

    res
      .status(200)
      .json({ message: "Day added and hours updated", updatedMonth });
  } catch (error) {
    console.error("Error adding day:", error);
    res.status(500).json({ message: "Failed to add day" });
  }
};

exports.patchMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const { columns, hours } = req.body;



    if (!columns || !hours) {
      return res
        .status(400)
        .json({ error: "Missing columns or hours in request body" });
    }

    const monthDoc = await monthModel.findOne({ year, month });

    if (!monthDoc) {
      return res.status(404).json({ error: "Month not found" });
    }

    monthDoc.columns = columns;
    monthDoc.hours = hours;

    await monthDoc.save();

    res.status(200).json({
      message: "Month successfully updated",
      month: monthDoc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.patchAllHours = async (req, res) => {
  const { id } = req.params;
  const { allHours, currentHours } = req.body;


  try {
    const updatedMonth = await monthModel.findByIdAndUpdate(
      id,
      { "hours.allHours": allHours, "hours.currentHours": currentHours },
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

// delete

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

exports.deleteDay = async (req, res) => {
  const { year, month } = req.params;
  const { dayId, columnType, calcHours } = req.body;

  if (!["submitted", "accepted", "rejected"].includes(columnType)) {
    return res.status(400).json({ message: "Invalid column type" });
  }

  try {
    const monthDoc = await monthModel.findOne({ year: +year, month: +month });

    if (!monthDoc) {
      return res.status(404).json({ message: "Month not found" });
    }

    const originalLength = monthDoc.columns[columnType].length;

    monthDoc.columns[columnType] = monthDoc.columns[columnType].filter(
      (day) => day._id.toString() !== dayId
    );

    if (monthDoc.columns[columnType].length === originalLength) {
      return res
        .status(404)
        .json({ message: "Day not found in the column" });
    }

    if (calcHours && typeof calcHours === "object") {
      monthDoc.hours = calcHours;
    }

    await monthDoc.save();

    res.status(200).json({
      message: "Day deleted and hours updated successfully",
      updatedMonth: monthDoc,
    });
  } catch (error) {
    console.error("Error deleting day:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
