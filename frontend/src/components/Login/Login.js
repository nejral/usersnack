import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // -
    onLogin({ email, password });
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginTitle">Usersnack Login</h2>
        <form onSubmit={handleSubmit} className="loginForm">
          <label className="loginLabel">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              required
            />
          </label>
          <label className="loginLabel">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              required
            />
          </label>
          <button type="submit" className="loginButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
