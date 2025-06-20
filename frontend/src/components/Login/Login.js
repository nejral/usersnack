import React, { useState } from "react";
import "./Login.css";
import {login, submitOrder} from "../../api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const credentials = {
        email,
        password,
      };

      const res = await login(credentials); // This is already parsed JSON

      onLogin(res.data);
    } catch (err) {
      setError(err.message || "Login failed");
    }
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
          {error && <div className="loginError">{error}</div>}
          <button type="submit" className="loginButton">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
