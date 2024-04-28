const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: String,
  questionUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  user: Object,
  upvotes: {
    type: Number,
    default: 0 // Assuming initial upvotes are 0
  },
  downvotes: {
    type: Number,
    default: 0 // Assuming initial upvotes are 0
  },
  user: Object,
});

module.exports = mongoose.model("Questions", QuestionSchema);
