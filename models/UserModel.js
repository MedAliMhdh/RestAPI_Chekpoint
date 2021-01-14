const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    default: Date.now,
  },
  Email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
