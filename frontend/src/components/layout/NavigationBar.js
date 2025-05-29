import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="navigation-bar">
            <div className="icon" onClick={() => navigate('/dashboard')}>
                <img src="/assets/icon.png" alt="Logo" />
            </div>

            <div className="profile-section" ref={menuRef}>
                <img
                    src="/assets/profile.png" // You can use a user avatar here
                    alt="Profile"
                    className="profile-avatar"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                {menuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => navigate('/profile')}>Profile</button>

                        <button onClick={() => navigate('/')}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
