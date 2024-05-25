import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers';
import './peoplePage.css';

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  const [leetCodeNames, setLeetCodeNames] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

  const fetchAndSendLeetCodeNames = async () => {
    try {
      const leetCodeNamesResponse = await fetch('/api/leaderboard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names: leetCodeNames }),
      });

      if (leetCodeNamesResponse.ok) {
        console.log('LeetCode names added successfully');
        // Clear the leetCodeNames state after successfully sending to backend
        setLeetCodeNames([]);
      } else {
        console.error('Failed to add LeetCode names');
      }
    } catch (error) {
      console.error('Error adding LeetCode names:', error);
    }
  };

  const handleAddLeetCodeName = (name) => {
    setLeetCodeNames([...leetCodeNames, name]);
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
    
    </div>
  );
};

export default PeoplePage;
