import React, { useEffect, useState } from "react";
import fetchUsers from '../fetchUsers';
import axios from "axios";
// import "./profile.css"
import "./peoplePage.css"

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  // const [leetCodeNames, setLeetCodeNames] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      {/* Button to fetch and send LeetCode names to backend */}

      <h1>Profile</h1>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label htmlFor="searchQuery">Search by Leetcode ID:</label>
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
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              <div>{user.username}</div>
              <button onClick={() => handleConnect(user.id)} disabled={loading}>
                {loading ? "Connecting..." : "Connect"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default ProfilePage;
