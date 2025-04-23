const mongoose = require('mongoose');

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri); 
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDb;
