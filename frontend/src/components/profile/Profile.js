// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [username, setUsername] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfileAndBookings = async () => {
            try {
                const userRes = await axios.get('http://localhost:5000/get-user-info', { withCredentials: true });
                if (!userRes.data.success) {
                    setError(userRes.data.message || 'Failed to fetch user info');
                    setLoading(false);
                    return;
                }

                const { email, username } = userRes.data;
                setUserInfo({ email, username });
                setUsername(username);

                const bookingsRes = await axios.post('http://localhost:5000/bookings', { email }, { withCredentials: true });
                setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching data.');
                setLoading(false);
            }
        };

        fetchProfileAndBookings();
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/update-user-info', { username }, { withCredentials: true });
            if (response.data.success) {
                setUserInfo({ ...userInfo, username });
                setMessage('Profile updated successfully!');
                setEditMode(false);
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error updating profile.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-heading">User Profile</h2>

                <div className="profile-info">
                    <div className="profile-field">
                        <label>Email:</label>
                        <input type="text" value={userInfo.email} readOnly className="readonly-input" />
                    </div>

                    <div className="profile-field">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={editMode ? 'editable-input' : 'readonly-input'}
                            readOnly={!editMode}
                        />
                    </div>

                    <button className="edit-button" onClick={editMode ? handleSave : () => setEditMode(true)}>
                        {editMode ? 'Save' : 'Edit'}
                    </button>

                    {message && <p className="message">{message}</p>}
                </div>

                <h3 className="bookings-title">Booked Events</h3>
                {bookings.length === 0 ? (
                    <p className="no-bookings">No bookings found.</p>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((booking, index) => (
                            <div key={index} className="booking-card">
                                <p><strong>Event:</strong> {booking.event}</p>
                                <p><strong>Hall:</strong> {booking.hall}</p>
                                <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
                                <p><strong>Booking ID:</strong> {booking.BID}</p>
                                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
