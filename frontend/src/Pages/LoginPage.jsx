import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Auth.css"; // We'll create shared CSS for login/signup

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    alert(`Logged in with: ${email}`);
    navigate("/"); // Redirect to home after login
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          <span className="text-warning">Sport</span>
          <span className="text-light">Spot</span>
        </h2>
        <p className="auth-subtitle">Login to book your favorite sports courts</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;