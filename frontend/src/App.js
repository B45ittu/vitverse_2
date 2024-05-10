import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./authentication/login";
import Quora from "./components/Quora";
import LeaderboardPage from "./components/Leaderboard"; // Import the LeaderboardPage component
import { login, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import QuoraHeader from "./components/QuoraHeader"; // Import the QuoraHeader component

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
      <QuoraHeader/> 
        <Routes>
     
          <Route path="/" element={user ? <Quora /> : <Login />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          {/* Define other routes */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
