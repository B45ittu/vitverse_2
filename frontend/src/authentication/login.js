import React, { useState, useEffect } from "react";
import "./login.css";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, emailProvider } from "../firebase";

function Login() {
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [textColor, setTextColor] = useState("#fff");
  const [showEmailLogin, setShowEmailLogin] = useState(false); // State to control modal visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleMouseMove = (event) => {
    setGradientPosition({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleGoogleLogin = async () => {
    
      const result = await signInWithPopup(auth, googleProvider).then(()=>{
        console.log(result);
      }).catch((e)=>{
        console.log(e);
      })

  };

  const handleEmailLogin = async () => {
    
      const result = await signInWithEmailAndPassword(auth, email, password,emailProvider).then(()=>{
        alert("successful login check for the password");
        setShowEmailLogin(false); // Close the modal on successful login
      }).catch((e)=>{
        alert("unsuccessful login check for the password");
      });
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
        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #ffffff, #f0f0f0, #dcdcdc, #c0c0c0, #a9a9a9, #808080, #696969, #555555, #2f2f2f, #000000)`
      }}
    >
      <div className="login-content">
        <div
          className="logo-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ color: isHovered ? "#000" : textColor }}
        >
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
            className="logo"
          />
          <h1 className="title" style={{ color: isHovered ? "#000" : textColor }}>Welcome Back!</h1>
        </div>
        <div>
          <button className="btn-login" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          <button className="btn-login" onClick={() => setShowEmailLogin(true)}>
            Login with Email
          </button>
        </div>
      </div>
      {/* Modal for Email Login */}
      {showEmailLogin && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEmailLogin(false)}>&times;</span>
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
              <button onClick={handleEmailLogin}>Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
