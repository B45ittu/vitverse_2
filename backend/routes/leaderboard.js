// routes/leaderboard.js

const express = require('express');
const router = express.Router();
const { fetchLeaderboardData, addLeetCodeName } = require('../leetcode/userData');

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

// Route to add LeetCode name
router.put('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    await addLeetCodeName(name);
    res.status(201).json({ message: 'LeetCode name added successfully' });
  } catch (error) {
    console.error('Error adding LeetCode name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
