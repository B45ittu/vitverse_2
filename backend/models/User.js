const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  answeredQuestionsCount: {
    type: Number,
    default: 0
  },
  badges: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", UserSchema);
