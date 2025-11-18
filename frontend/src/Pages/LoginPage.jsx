import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Auth.css"; 
import API from "../API";
import { UserContext } from "../UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // lowercase
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const response = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);

      login({
        name: response.data.name,
        email: response.data.email,
        token: response.data.token,
      });

      navigate("/"); // redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          <span className="text-warning">Sport</span>
          <span className="text-light">Spot</span>
        </h2>
        <p className="auth-subtitle">Login to book your favorite sports courts</p>

        <form onSubmit={handleLogin}>
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

        {/* Error message using CSS class */}
        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;