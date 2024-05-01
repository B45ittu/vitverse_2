const express = require("express");
const router = express.Router();

const questionDB = require("../models/Questions");

// Route to upvote a question
router.post("/upvote/:questionId", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    // Find the question in the database by questionId and update its upvotes count
    const updatedQuestion = await questionDB.findByIdAndUpdate(
      questionId,
      { $inc: { upvotes: 1 } }, // Increment upvotes count by 1
      { new: true } // Return the updated question
    );

    if (!updatedQuestion) {
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Question upvoted successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
});

router.post("/downvote/:questionId", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    // Find the question in the database by questionId and update its upvotes count
    const updatedQuestion = await questionDB.findByIdAndUpdate(
      questionId,
      { $inc: { downvotes: 1 } }, 
      { new: true } // Return the updated question
    );

    if (!updatedQuestion) {
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Question upvoted successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
});

// Route to create a new question
router.post("/", async (req, res) => {
  try {
    const newQuestion = await questionDB.create({
      questionName: req.body.questionName,
      questionUrl: req.body.questionUrl,
      user: req.body.user,
      upvotes: 0, // Initialize upvotes count to 0
    });

    res.status(201).send({
      status: true,
      message: "Question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Bad request format",
    });
  }
});

// Route to get all questions with answers....
router.get("/", async (req, res) => {
  try {
    const questions = await questionDB.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "allAnswers",
        },
      },
    ]);

    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unable to get the question details",
    });
  }
});

module.exports = router;
