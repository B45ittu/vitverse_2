// leetCodeRouter.js

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const leetCodeName = req.query.name; // Extracting LeetCode name from query parameter
    console.log("Received LeetCode name:", leetCodeName);
    // Process the LeetCode name as needed
    // Respond with success or any other appropriate response
    res.status(200).send("LeetCode name received successfully");
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
