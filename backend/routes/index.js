const express = require("express");
const router = express.Router();

const questionRouter = require("./Questions");
const answerRouter = require("./Answers");

router.get("/", (req, res) => {
  res.send("This api is reserved for quora clone");
});

router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;