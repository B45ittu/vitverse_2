import React, { useEffect, useState } from 'react';
import fetchUsers from '../fetchUsers'; // Adjusted path to fetchUsers.js
import './profile.css'; // Ensure this path matches your file name

const Profile = ({ match }) => {
  const { userId } = match.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const users = await fetchUsers();
      const userData = users.find(user => user.id === userId);
      setUser(userData);
    };

    getUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-card">
        <img src={user.photoURL} alt={user.displayName} className="profile-image" />
        <div className="profile-info">
          <p className="name">{user.displayName}</p>
          <p>{user.email}</p>
          <div className="user-stats">
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
            <p>Questions Asked: {user.questionsAsked}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
