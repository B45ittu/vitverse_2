import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./authentication/login";
import Quora from "./components/Quora";
import LeaderboardPage from "./components/Leaderboard";
import { login, selectUser } from "./features/userSlice";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import QuoraHeader from "./components/QuoraHeader";
import Compiler from "./components/Compiler";
import PeoplePage from './components/PeoplePage';
import Todo from "./components/Todo";
import ProfilePage from "./components/ProfilePage";


// Save user information to Firestore
const saveUserToFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    });
    console.log(`User ${user.uid} added to Firestore`);
  } catch (error) {
    console.error("Error adding user to Firestore: ", error);
  }
};

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        saveUserToFirestore(authUser); // Save user to Firestore
        console.log("AuthUser", authUser);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {user && <QuoraHeader />}
        <Routes>
          <Route
            path="/"
            element={user ? <Quora /> : <Login />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
<<<<<<< HEAD
=======
          {/* <Route path="/profile/:userId" component={Profile} /> */}
>>>>>>> 81556cbaaf04de6ffa470206dc1f39f179e521e9
          <Route path="/Compiler" element={<Compiler />} />
          <Route path="/profilePage" element={<Profile />} />
          <Route path="/Todo" element={<Todo />} />
          {/* <Route path="/profilePage" element={<Profile/>}/> */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
