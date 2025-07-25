const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("Connected to MongoDB");
    app.listen("https://godziny-server.vercel.app", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

startServer();
