import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element: Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/is-logged-in', { withCredentials: true }) // ✅ FIXED
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch((error) => {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    if (!showAlert) {
      alert('You are not authorized to view this page. Redirecting to the login page.');
      setShowAlert(true);
    }
    return <Navigate to="/login" />; // 👈 optional: redirect to /login, not /
  }

  return Component;
};

export default PrivateRoute;
