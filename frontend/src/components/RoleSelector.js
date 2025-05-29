import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelector = () => {
    const navigate = useNavigate();

    const handleSelectRole = (role) => {
        if (role === "admin") {
            navigate("/admin_login");
        } else {
            navigate("/login", { state: { role } });
        }
    };

    return (
        <>
            <div
                className="event-role-container"
                style={{
                    backgroundImage: "url('/events_back.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Decorative Bokeh lights */}
                <div className="bokeh b1"></div>
                <div className="bokeh b2"></div>
                <div className="bokeh b3"></div>

                <div className="event-card">
                    <h1 className="event-title">Welcome to EventVista</h1>
                    <p className="subtitle">Choose how you'd like to proceed</p>

                    <div className="button-wrap">
                        <button onClick={() => handleSelectRole("user")} className="event-btn user-btn">
                            🎉 User
                        </button>
                        <button onClick={() => handleSelectRole("admin")} className="event-btn admin-btn">
                            🛠 Admin
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }

                .event-role-container {
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }

                .event-card {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(25px);
                    padding: 60px 40px;
                    border-radius: 30px;
                    text-align: center;
                    color: white;
                    z-index: 2;
                    animation: fadeSlide 1.2s ease forwards;
                }

                .event-title {
                    font-size: 2.8rem;
                    font-weight: 800;
                    color: #f8c46a;
                    text-shadow: 0 0 10px #f8c46a66;
                    margin-bottom: 10px;
                }

                .subtitle {
                    color: #ccc;
                    font-size: 1.1rem;
                    margin-bottom: 40px;
                    font-style: italic;
                }

                .button-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .event-btn {
                    padding: 15px 25px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    border-radius: 12px;
                    cursor: pointer;
                    border: none;
                    transition: all 0.4s ease;
                    width: 220px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    letter-spacing: 0.5px;
                    backdrop-filter: blur(5px);
                }

                .event-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 12px;
                    z-index: -1;
                    transition: 0.4s;
                }

                .user-btn::before {
                    background: linear-gradient(to right, #67e8f9, #3b82f6);
                }

                .admin-btn::before {
                    background: linear-gradient(to right, #f472b6, #c026d3);
                }

                .event-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
                }

                .bokeh {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                    animation: float 10s ease-in-out infinite;
                }

                .b1 {
                    width: 300px;
                    height: 300px;
                    background: #f8c46a;
                    top: 10%;
                    left: 5%;
                }

                .b2 {
                    width: 250px;
                    height: 250px;
                    background: #c084fc;
                    bottom: 10%;
                    right: 5%;
                    animation-delay: 2s;
                }

                .b3 {
                    width: 200px;
                    height: 200px;
                    background: #60a5fa;
                    bottom: 40%;
                    left: 45%;
                    animation-delay: 4s;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(20px); }
                }

                @keyframes fadeSlide {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 500px) {
                    .event-card {
                        width: 90%;
                        padding: 30px 20px;
                    }

                    .event-title {
                        font-size: 2rem;
                    }

                    .event-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default RoleSelector;
