const mongoose = require("mongoose");
const db_url = process.env.D_URL;
const dbConnection = async () => {
  try {
    const state = await mongoose.connect(db_url);
    console.log(`Successfully Connection on ${state.connection.host}`);
  } catch (err) {
    console.log(`Database Error: ${err}`);
  }
};

module.exports = dbConnection;