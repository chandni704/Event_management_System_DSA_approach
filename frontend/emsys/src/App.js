import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelector from "./components/RoleSelector.js";
import VenueFinder from "./components/VenueFinder.js";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";

import HotelCard from './components/homepage/HotelCard.js';
import dijkstra from './utils/dijkstra.js';
import AdminLogin from './components/admin/AdminLogin.js';
import AdminDashboard from './components/admin/AdminDashboard.js';

import Dashboard from "./components/homepage/Dashboard.js";

import HomePage from './components/homepage/home.js';
import BirthdayPage from "./components/Elist/Birthday.js";
import OfficialMeetings from "./components/Elist/official_meetings.js";
import KittyParty from "./components/Elist/Kitty_Party.js";
import Wedding from "./components/Elist/Wedding.js";
import Namingcremony from "./components/Elist/naming_ceremony.js";
import Concert from "./components/Elist/concerts_and_parties.js";
import EventBookingForm from "./components/bking/Booking.js";
import YourComponent from "./components/homepage/mybookings.js";
import PrivateRoute from './components/privateroute.js';
import VenuePage from './components/venues/Uday_bhavan.js';
import Admin_login from "./components/admin/AdminLogin.js";
import Admin_dashboard from "./components/admin/AdminDashboard.js";

import HotelDetail from "./components/homepage/HotelDetail.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hotels/:hotelName" element={<HotelDetail />} />
        {/* Protected Routes */}
        <Route path="/venues" element={<PrivateRoute element={<VenueFinder />} />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/booking" element={<PrivateRoute element={<EventBookingForm />} />} />
        <Route path="/birthday" element={<PrivateRoute element={<BirthdayPage />} />} />
        <Route path="/official" element={<PrivateRoute element={<OfficialMeetings />} />} />
        <Route path="/kitty" element={<PrivateRoute element={<KittyParty />} />} />
        <Route path="/wedding" element={<PrivateRoute element={<Wedding />} />} />
        <Route path="/naming" element={<PrivateRoute element={<Namingcremony />} />} />
        <Route path="/concert" element={<PrivateRoute element={<Concert />} />} />
        <Route path="/mybookings" element={<PrivateRoute element={<YourComponent />} />} />

        {/* ✅ Dynamic venue route */}
        <Route path="/venue/:venueName" element={<PrivateRoute element={<VenuePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
