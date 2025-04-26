import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'; // ⬅️ added useLocation
import './clear.css';

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected role passed from RoleSelector
  const role = location.state?.role || "user";

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:5000/submit-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }), // ⬅️ include role in request if needed
      });

      const result = await response.json();

      if (result.success) {
        alert("Login success");
        navigate("/dashboard");
      } else {
        alert(result.message);
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "#0b0d19",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b0d19",
          padding: "40px",
          borderRadius: "15px",
          boxShadow:
            "8px 8px 15px rgba(0, 0, 0, 0.2), -8px -8px 15px rgba(255, 255, 255, 0.1)",
          width: "350px",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "2.5em",
            marginBottom: "10px",
            color: "#8ac7ff",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Login
        </h1>
        <h2
          style={{
            textAlign: "center",
            color: "#8ac7ff",
            marginBottom: "20px",
            fontWeight: "500",
          }}
        >
          Logging in as:{" "}
          <span style={{ textTransform: "uppercase", fontWeight: "bold" }}>
            {role}
          </span>
        </h2>

        <form onSubmit={handleLogin}>
          <label htmlFor="email" style={{ fontWeight: "bold", color: "#8ac7ff" }}>
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email@example.com"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "16px",
            }}
          />
          <label htmlFor="password" style={{ fontWeight: "bold", color: "#8ac7ff" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "10px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "rgba(58, 123, 213, 0.8)",
              color: "white",
              fontSize: "18px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        {error && (
          <div
            id="error"
            style={{
              marginTop: "10px",
              color: "#ff7373",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#aaa",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#8ac7ff",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
