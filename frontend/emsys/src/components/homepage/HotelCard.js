import React from "react";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, distance }) {
  const navigate = useNavigate();
  const hotelFolder = hotel.name.replace(/\s+/g, "%20"); // For URL-safe folder names

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        alignItems: "center",
      }}
    >
      {/* Hotel Image on the left */}
      <img
        src={`/venues/${hotel.name}/photos/N1.jpg`}
        alt={hotel.name}
        style={{ width: "180px", height: "120px", objectFit: "cover", marginRight: "20px", borderRadius: "6px" }}
      />

      {/* Info on the right */}
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0 0 10px" }}>{hotel.name}</h2>
        <p>Area: {hotel.area}</p>
        {distance !== undefined && <p>Distance: {distance} KM</p>}
        <p>Events: {hotel.supportedEvents.join(", ")}</p>
        <button
          style={{
            marginTop: "10px",
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/hotels/${hotelFolder}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
