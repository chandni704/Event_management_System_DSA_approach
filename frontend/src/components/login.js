import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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
        body: JSON.stringify({ email, password, role }),
      });

      const result = await response.json();

      if (result.success) {
        //alert("Login success");
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
        backgroundImage: "url('/events_back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
          backdropFilter: "blur(25px)",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          width: "350px",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "10px",
            color: "#f8c46a",
            textShadow: "0 0 10px #f8c46a66",
          }}
        >
          Login
        </h1>

        <h2
          style={{
            textAlign: "center",
            color: "#f8c46a",
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
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              border: "rgba(5, 5, 5, 0.2) solid 1px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#000000", // changed color
              fontSize: "16px",
            }}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            style={{
              width: "100%",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              border: "rgba(12, 12, 12, 0.2) solid 1px",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#000000", // changed color
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "15px",
              background: "linear-gradient(to right, #67e8f9, #3b82f6)",
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
            marginTop: "20px",
            fontSize: "14px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );

};

export default Login;
