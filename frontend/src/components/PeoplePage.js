import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers';
import axios from 'axios';
import './peoplePage.css';

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/user/search/${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
      setError("Error searching for users. Please try again.");
    }
    setLoading(false);
  };

  const handleLeetCodeSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLeetCodeData(null);
    try {
      // Fetch and store data
      await axios.post('/api/leetcode/fetch', { username: searchQuery });

      // Retrieve stored data
      const response = await axios.get(`/api/leetcode/data/${searchQuery}`);
      if (response.data) {
        setLeetCodeData(response.data);
      } else {
        setError("No data found for the provided LeetCode ID.");
      }
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      setError("Error fetching LeetCode data. Please try again.");
    }
    setLoading(false);
  };

  const handleConnect = async (userId) => {
    setLoading(true);
    setError("");
    try {
      // Implement your connect logic here, using the userId
      console.log("Connecting to user:", userId);
    } catch (error) {
      console.error("Error connecting to user:", error);
      setError("Error connecting to user. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="people-container">
      <h1 className="people-title">People</h1>
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
        <form onSubmit={handleLeetCodeSearchSubmit}>
          <div>
            <label htmlFor="searchQuery">Leetcode ID: </label>
            <input
              type="text"
              id="searchQuery"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
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
