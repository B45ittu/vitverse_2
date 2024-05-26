import React, { useState, useEffect } from "react";
import "./login.css";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Login() {
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [textColor, setTextColor] = useState("#fff");
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");

  const handleMouseMove = (event) => {
    setGradientPosition({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToFirestore(user);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailLogin = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      await saveUserToFirestore(user);
      alert("Successful login");
      setShowEmailLogin(false);
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Unsuccessful login: " + error.message);
    }
  };

  const handleEmailSignUp = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      user.displayName = displayName;

      await sendEmailVerification(user);
      await signOut(auth);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        leetcodeUsername: leetcodeUsername,
        emailVerified: false,
      });

      alert("Successful sign-up. Please check your email to verify your account.");
      setShowSignUp(false);
    } catch (error) {
      console.error("Sign-up error:", error.message);
      alert("Unsuccessful sign-up: " + error.message);
    }
  };

  const saveUserToFirestore = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        leetcodeUsername: leetcodeUsername,
        emailVerified: user.emailVerified,
      });
      console.log(`User ${user.uid} added to Firestore`);
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.querySelector(".login-container");
      if (container) {
        const { color } = window.getComputedStyle(container);
        setTextColor(color);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="login-container"
      style={{
        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #ffffff, #f0f0f0, #dcdcdc, #c0c0c0, #a9a9a9, #808080, #696969, #555555, #2f2f2f, #000000)`,
      }}
    >
      <div className="login-content">
        <div
          className="logo-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ color: isHovered ? "#000" : textColor }}
        >
          <h1>Together we build.</h1>
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
            className="logo"
          />
          <h1 className="title" style={{ color: isHovered ? "#000" : textColor }}>
            Welcome Back!
          </h1>
        </div>
        <div>
          <button className="btn-login" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          <button className="btn-login" onClick={() => setShowEmailLogin(true)}>
            Login with Email
          </button>
        </div>
        <div>
          <span className="sign-up-link" onClick={() => setShowSignUp(true)}>
            Don't have an account? Sign Up
          </span>
        </div>
      </div>
      {showEmailLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEmailLogin(false)}>
              &times;
            </span>
            <div className="email-login-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="LeetCode Username"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
              />
              <button onClick={handleEmailLogin}>Login</button>
            </div>
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSignUp(false)}>
              &times;
            </span>
            <div className="email-signup-form">
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="LeetCode Username"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
              />
              <button onClick={handleEmailSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
