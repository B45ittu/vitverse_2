import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import goldImage from '../assets/gold.png'; 
import silverImage from '../assets/silver.png'; 
import bronzeImage from '../assets/bronze.png'; 

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
    <div className="leaderboard-container">
      <h1 className="leaderboard-header">Leaderboard</h1>
      <ul className="leaderboard-list">
        {leaderboardData.map((user, index) => (
          <li key={index} className="leaderboard-item">
            {index === 0 && <img src={goldImage} alt="Gold Medal" style={{ width: '24px', height: '24px', marginRight: '5px' }} />}
            {index === 1 && <img src={silverImage} alt="Silver Medal" style={{ width: '24px', height: '24px', marginRight: '5px' }} />}
            {index === 2 && <img src={bronzeImage} alt="Bronze Medal" style={{ width: '24px', height: '24px', marginRight: '5px' }} />}
            {index>=3 && <span className='index'>{index+1}</span>}
            <span> {user.username}</span> - Total Correct Submissions: {getTotalCorrectSubmissions(user)}
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
