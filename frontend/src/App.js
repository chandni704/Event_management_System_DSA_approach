import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelector from "./components/RoleSelector.js";
import Login from "./components/login.js";
import SignUp from "./components/signup.js";
import Dashboard from "./components/homepage/Dashboard.js";
import EventBookingForm from "./components/bking/Booking.js";
import YourComponent from "./components/homepage/mybookings.js";
import PrivateRoute from './components/privateroute.js';
import Admin_login from "./components/admin/AdminLogin.js";
import Admin_dashboard from "./components/admin/AdminDashboard.js";
import HotelDetail from "./components/homepage/HotelDetail.js";
import MainLayout from './components/layout/MainLayout.js';

function App() {
  return (
    <Router>
      <Routes>

        {/* Routes WITHOUT layout (e.g., login, signup, admin) */}
        <Route path="/" element={<RoleSelector />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin_login" element={<Admin_login />} />
        <Route path="/Admin_dashboard" element={<Admin_dashboard />} />

        {/* Routes WITH layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/booking" element={<PrivateRoute element={<EventBookingForm />} />} />
          <Route path="/mybookings" element={<PrivateRoute element={<YourComponent />} />} />
          <Route path="/hotels/:hotelName" element={<HotelDetail />} />
          <Route path="/book/:hotelName" element={<EventBookingForm />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
