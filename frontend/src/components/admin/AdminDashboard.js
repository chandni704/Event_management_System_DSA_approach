import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();


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
            const eventMatch = !filters.event || b.event.toLowerCase() === filters.event.toLowerCase();
            const venueMatch = !filters.venue || b.hall.toLowerCase() === filters.venue.toLowerCase();
            const monthMatch = !filters.month || new Date(b.eventDate).getMonth() + 1 === parseInt(monthMap[filters.month]);
            return eventMatch && venueMatch && monthMatch;
        });
        setFilteredBookings(filtered);
    }, [filters, bookings]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleLogout = () => {
        // Add real logout logic as needed (e.g., token clear)
        navigate('/')
    };

    return (
        <div className="dashboard">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            <aside className="sidebar">
                <h2>Filter By</h2>
                <label>Event Type</label>
                <select name="event" value={filters.event} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Naming Ceremony">Naming Ceremony</option>
                    <option value="Official Meetings">Official Meetings</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Half Saree Ceremony">Half Saree Ceremony</option>
                </select>

                <label>Venue</label>
                <select name="venue" value={filters.venue} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {/* venue options unchanged */}
                    <option value="UK 27">UK 27</option>
                    <option value="Green Garden">Green Garden</option>
                    <option value="Dharmanath Bhavan">Dharmanath Bhavan</option>
                    <option value="Millennium garden">Millenium Garden</option>
                    <option value="Shagun Garden">Shagun Garden</option>
                    <option value="Mahatma Gandhi Bhavan">Mahatma Gandhi Bhavan</option>
                    <option value="Maratha Mandir Karayalya">Maratha Mandir Karayalya</option>
                    <option value="Ramanath Mangal Karayalya">Ramanath Mangal Karayalya</option>
                    <option value="Sankalp Garden">Sankalp Garden</option>
                    <option value="Native hotel">Native Hotel</option>
                    <option value="The Pallidum Banquet">The Pallidum Banquet</option>
                    <option value="Ashirwad Mangal Karayal">Ashirwad Mangal Karayal</option>
                    <option value="Pai Resort">Pai Resort</option>
                    <option value="Manoprabha Karyalaya">Manoprabha Karyalaya</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="KPTCL">KPTCL</option>
                    <option value="Mahant Bhavan">Mahant Bhavan</option>
                    <option value="Sankam Hotel">Sankam Hotel</option>
                    <option value="Paradise Garden">Paradise Garden</option>
                    <option value="City Hall">City Hall</option>
                    <option value="Adarsha Palace">Adarsha Palace</option>
                    <option value="Maratha Mandir Karyalaya">Maratha Mandir Karyalaya</option>
                    <option value="Mahaveer Bhavan">Mahaveer Bhavan</option>
                    <option value="Adinath Bhavan">Adinath Bhavan</option>
                    <option value="Pink Veranda">Pink Veranda</option>
                    <option value="Royal Ritz">Royal Ritz</option>
                    <option value="Armaan Hall">Armaan Hall</option>
                    <option value="Ayodhya Function hall">Ayodhya Function hall</option>
                    <option value="Ramanath Marriage Hall">Ramanath Marriage Hall</option>
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
