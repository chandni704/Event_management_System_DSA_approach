import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "pappu") {
            navigate("/Admin_dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="admin-login-wrapper">
            <form className="admin-login-card" onSubmit={handleLogin}>
                <h2>🔐 Admin Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <style>{`
                .admin-login-wrapper {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg,rgb(6, 7, 7),rgb(216, 221, 231));
                    font-family: 'Poppins', sans-serif;
                }

                .admin-login-card {
                    background: rgba(223, 153, 153, 0.05);
                    border: 1px solid rgba(29, 21, 21, 0.15);
                    padding: 50px 40px;
                    border-radius: 20px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    width: 90%;
                    max-width: 400px;
                    animation: fadeIn 1s ease-in-out forwards;
                }

                .admin-login-card h2 {
                    text-align: center;
                    margin-bottom: 10px;
                    color: #facc15;
                }

                .admin-login-card input {
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: rgba(7, 7, 7, 0.2) solid 1px;
                    background-color: rgba(255, 255, 255, 0.1);
                    color:rgb(252, 251, 251);
                    font-size: 1rem;
                    outline: none;
                    transition: background-color 0.3s ease;
                }

                .admin-login-card input::placeholder {
                    color: #ccc;
                }

                .admin-login-card input:focus {
                    background-color: rgba(255, 255, 255, 0.2);
                }

                .admin-login-card button {
                    padding: 12px;
                    border: none;
                    border-radius: 10px;
                    background: #22c55e;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .admin-login-card button:hover {
                    background: #16a34a;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
