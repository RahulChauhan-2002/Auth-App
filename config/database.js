const mongoose = require("mongoose");

require('dotenv').config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); 
  }
};

module.exports = dbConnect;
