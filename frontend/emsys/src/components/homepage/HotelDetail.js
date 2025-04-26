import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HotelDetail() {
  const { hotelName } = useParams();
  const [hotel, setHotel] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/hotels.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((h) => h.name === hotelName);
        setHotel(found);

        if (found) {
          fetch(`/venues/${found.name}/description/desc.txt`)
            .then((res) => res.text())
            .then((text) => setDescription(text));
        }
      });
  }, [hotelName]);

  const logout = () => {
    axios
      .post('http://localhost:5000/logout')
      .then((response) => {
        if (response.status === 200) {
          alert("Logout Successful!");
          navigate('/');
        } else {
          alert('Logout failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during logout. Please try again.');
      });
  };

  if (!hotel) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => navigate('/mybookings')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          My Bookings
        </button>
        <button
          onClick={logout}
          style={{
            padding: '10px 15px',
            backgroundColor: '#dc3545',
            color: '#fff',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i> Logout
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 15px",
          marginBottom: "20px",
          background: "#eee",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        ⬅ Back
      </button>

      {/* Hotel Info */}
      <h1>{hotel.name}</h1>
      <p><strong>Area:</strong> {hotel.area}</p>
      <p><strong>Events Supported:</strong> {hotel.supportedEvents.join(", ")}</p>

      {/* Book Now Button */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => navigate(`/book/${hotel.name}`)}
          style={{
            padding: '12px 25px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          📅 Book Now
        </button>
      </div>

      {/* Image Carousel */}
      <h3 style={{ marginTop: "30px" }}>Photos:</h3>
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000}
        showStatus={false}
        dynamicHeight={false}
        emulateTouch
      >
        {[1, 2, 3, 4].map((num) => (
          <div key={num}>
            <img
              src={`/venues/${hotel.name}/photos/N${num}.jpg`}
              alt={`N${num}`}
              style={{
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Description */}
      <h3 style={{ marginTop: "30px" }}>Description:</h3>
      <p style={{ lineHeight: "1.6" }}>{description}</p>
    </div>
  );
}

export default HotelDetail;
