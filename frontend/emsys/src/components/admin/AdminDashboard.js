import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [filters, setFilters] = useState({
        event: '',
        venue: '',
        month: '',
    });

    const monthMap = {
        January: '1', February: '2', March: '3', April: '4',
        May: '5', June: '6', July: '7', August: '8',
        September: '9', October: '10', November: '11', December: '12'
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/bookings');
                setBookings(res.data);
                setFilteredBookings(res.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching bookings.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        const filtered = bookings.filter((b) => {
            const eventMatch = !filters.event || b.event === filters.event;
            const venueMatch = !filters.venue || b.hall === filters.venue;
            const monthMatch = !filters.month || new Date(b.eventDate).getMonth() + 1 === parseInt(monthMap[filters.month]);
            return eventMatch && venueMatch && monthMatch;
        });
        setFilteredBookings(filtered);
    }, [filters, bookings]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <h2>Filter By</h2>
                <label>Event Type</label>
                <select name="event" value={filters.event} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Naming Ceremony">Naming Ceremony</option>
                    <option value="Kitty Party">Kitty Party</option>
                    <option value="Official Meetings">Official Meetings</option>
                    <option value="Concert">Concert</option>
                    <option value="Party">Party</option>
                </select>

                <label>Venue</label>
                <select name="venue" value={filters.venue} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Garden Hall">Garden Hall</option>
                    <option value="Swimming Pool Pavilion">Swimming Pool Pavilion</option>
                    <option value="Elegant Ballroom">Elegant Ballroom</option>
                    <option value="Terrace Lounge">Terrace Lounge</option>
                    <option value="Majestic Courtyard">Majestic Courtyard</option>
                    <option value="Sky Lounge">Sky Lounge</option>
                </select>

                <label>Month</label>
                <select name="month" value={filters.month} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {Object.keys(monthMap).map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </aside>

            <main className="content">
                <h1>Admin Dashboard - All Bookings</h1>
                {loading ? (
                    <div className="status">Loading bookings...</div>
                ) : error ? (
                    <div className="status error">{error}</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="status">No bookings found.</div>
                ) : (
                    <div className="card-grid">
                        {filteredBookings.map((booking, idx) => (
                            <div key={idx} className="card">
                                <h3>{booking.fullName}</h3>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Phone:</strong> {booking.phoneNumber}</p>
                                <p><strong>Event:</strong> {booking.event}</p>
                                <p><strong>Venue:</strong> {booking.hall}</p>
                                <p><strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
                                <p><strong>Payment ID:</strong> {booking.paymentId || 'Not Paid'}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
