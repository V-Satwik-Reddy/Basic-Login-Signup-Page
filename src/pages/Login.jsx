import React, { useState } from 'react';
import "../styles/Login.css";
import { account } from '../config/Appwrite';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const loginFunc = async () => {
    console.log("Attempting login with:", userData);
    try {
      const session = await account.getSession("current");
      console.log("Active session found:", session);
      alert("Login successful!");
      navigate("/account");
    } catch (sessionError) {
      console.log("No active session, creating a new one...");
      try {
        await account.createEmailSession(userData.email, userData.password);
        console.log("Login successful");
        alert("Login successful!");
        navigate("/account");
      } catch (error) {
        alert("Invalid email or password. Please try again.");
        console.error("Login failed:", error.message);
      }
    }
  };

  return (
    <div id="login-main">
      <div id="login-form">
        <h2 id="login-h2">Login</h2>
        <input
          type="email"
          id="login-input"
          placeholder="Email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          id="login-input"
          placeholder="Password"
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <button onClick={loginFunc} id="login-btn">Login</button>
      </div>
    </div>
  );
};

export default Login;
