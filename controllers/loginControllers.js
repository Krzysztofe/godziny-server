const AdminModel = require("../models/modelAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.loginAdmin = async (req, res, next) => {
  const { adminEmail, adminPassword } = req.body;

  let loadedAdmin;

  try {
    const findAdmin = await AdminModel.findOne({ adminEmail });
    if (!findAdmin) {
      const error = new Error("Admin not found");
      error.statusCode = 401;
      throw error;
    }
    loadedAdmin = findAdmin;

    const isEqual = await bcrypt.compare(
      adminPassword,
      findAdmin.adminPassword
    );

    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: loadedAdmin.adminEmail, adminId: loadedAdmin._id },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

