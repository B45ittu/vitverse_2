import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers';
import './peoplePage.css';
import fetchUserStats from './leetFetcher';

async function fetchData(username) {
  const url = 'https://leetcode.com/graphql';
  const query = `{
    matchedUser(username: "${username}") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    const { data } = responseData;

    if (data && data.matchedUser) {
      return data.matchedUser;
    } else {
      console.log("No data found for the provided username:", username);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data for username", username, ":", error);
    return null;
  }
}

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leetCodeData, setLeetCodeData] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setLoading(true);
    setError("");

    try {
      const data = await fetchUserStats(query.trim());
      if (data) {
        setLeetCodeData(data);
      } else {
        setError("No data found for the provided LeetCode ID.");
      }
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      setError("Error fetching LeetCode data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="people-container">
      <h1 className="people-title">Your profile</h1>
      <ul className="people-list">
        {users.map((user, index) => (
          <li key={index}>
            <img src={user.photoURL} alt={user.displayName} />
            <div>
              <p className="name">{user.displayName}</p>
              <p>{user.email}</p>
            </div>
          </li>
        ))}
      </ul>

      <h1>Search</h1>
      <div className='Search'>
        <div>
          <label htmlFor="searchQuery">Leetcode ID: </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {loading ? <p>Searching...</p> : null}
        </div>
        {error && <p>{error}</p>}
        {leetCodeData && (
          <div className="leetcode-data">
            <h3>LeetCode Data for {leetCodeData.username}</h3>
            <ul>
              {leetCodeData.submitStats.acSubmissionNum.map((stat, index) => (
                <li key={index}>
                  {stat.difficulty}: {stat.count} correct submissions
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeoplePage;
