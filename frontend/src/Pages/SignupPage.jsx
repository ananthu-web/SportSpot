import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Auth.css";
import API from "../API";
import { UserContext } from "../UserContext";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/api/auth/signup", {
        name,
        email,
        password,
        
      });

      console.log("Signup success:", response.data);

      // Save JWT in localStorage
      localStorage.setItem("token", response.data.token);

      login({
        name: response.data.name,
        email: response.data.email,
        id: response.data._id,
        isAdmin: response.data.isAdmin,
        token: response.data.token,
      });

      // Redirect to home/dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.error("Signup error:", err.response?.data?.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          <span className="text-warning">Sport</span>
          <span className="court-text">Spot</span>
        </h2>
        <p className="auth-subtitle">Create your account to book sports courts</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Signup
          </button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;