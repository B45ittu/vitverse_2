import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers';
import './peoplePage.css';

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  // const [leetCodeNames, setLeetCodeNames] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };

    getUsers();
  }, []);

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
      {/* Button to fetch and send LeetCode names to backend */}
    
    </div>
  );
};

export default PeoplePage;
