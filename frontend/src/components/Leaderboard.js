import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard'); // Fetch data from backend endpoint
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboardData.map((user, index) => (
          <li key={index}>
            {user.username} - Total Correct Submissions: {getTotalCorrectSubmissions(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

function getTotalCorrectSubmissions(user) {
  return user.submitStats.acSubmissionNum
    .filter(stats => stats.difficulty === "Easy" || stats.difficulty === "Medium" || stats.difficulty === "Hard")
    .reduce((total, stats) => total + stats.count, 0);
}

export default Leaderboard;
