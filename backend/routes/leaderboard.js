// routes/leaderboard.js

const express = require('express');
const router = express.Router();
const { fetchLeaderboardData } = require('../leetcode/userData');

// Route to fetch leaderboard data
router.get('/', async (req, res) => {
  try {
    const leaderboardData = await fetchLeaderboardData();
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
