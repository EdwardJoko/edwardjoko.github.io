const mongoose = require('mongoose');
const db       = require('./db');

const connectDB = async () => {
  try {
    await mongoose.connect(db.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

