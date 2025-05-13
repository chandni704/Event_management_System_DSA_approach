import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css'; // We'll create this

const NavigationBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="navigation-bar">
            <div className="icon" onClick={() => navigate('/')}>
                <img src="/assets/icon.png" alt="Logo" />
            </div>
            <div className="nav-buttons">
                <button onClick={() => navigate('/mybookings')} className="btn-mybookings">
                    My Bookings
                </button>
                <button onClick={() => navigate('/profile')} className="btn-profile">
                    <i className="fas fa-user-circle"></i> Profile
                </button>
                <button onClick={() => navigate('/')} className="btn-logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    );
};

export default NavigationBar;
