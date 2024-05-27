// Assuming this code resides in your server.js file

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const router = require("./routes");
const leaderboardRouter = require("./routes/leaderboard");
const { fetchLeaderboardData } = require("./leetcode/userData"); // Import the fetchLeaderboardData function

const app = express();
const PORT = 80;

// Database connection
db.connect();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/api", router);
app.use("/api/leaderboard", leaderboardRouter);
app.use('/api/leetcode', router); // Mount the LeetCode router

// Serve the frontend build
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
  } catch (e) {
    res.send("Oops! unexpected error");
  }
});

// Start the server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
