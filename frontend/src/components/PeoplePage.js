import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers';
import './peoplePage.css';
import axios from "axios";

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [leetCodeName, setLeetCodeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

  const handleLeetCodeNameChange = (e) => {
    setLeetCodeName(e.target.value);
  };

  const handleLeetCodeNameSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post('/api/leetcode', { leetCodeName });
      console.log("LeetCode name submitted:", leetCodeName);
      setUserData(response.data);
    } catch (error) {
      console.error("Error submitting LeetCode name:", error);
      setError("Error submitting LeetCode name. Please try again.");
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

      <div className="leetcode-input">
        <h2>Enter LeetCode Name</h2>
        <input
          type="text"
          value={leetCodeName}
          onChange={handleLeetCodeNameChange}
          placeholder="Enter LeetCode Name"
        />
        <button onClick={handleLeetCodeNameSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default PeoplePage;
