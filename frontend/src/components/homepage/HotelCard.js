import React from "react";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, distance }) {
  const navigate = useNavigate();
  const hotelFolder = hotel.name.replace(/\s+/g, "%20");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        height: "100%",
      }}
      onClick={() => navigate(`/hotels/${hotelFolder}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 30px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      }}
    >
      <img
        src={`/venues/${hotel.name}/photos/N1.jpg`}
        alt={hotel.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          transition: "transform 0.4s ease",
        }}
      />

      <div style={{ padding: "20px", flex: 1 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: "1.5rem", color: "#B76E79" }}>{hotel.name}</h2>
        <p style={{ margin: "6px 0", color: "#555" }}>📍 {hotel.area}</p>
        {distance !== undefined && (
          <p style={{ margin: "6px 0", color: "#777" }}>🚗 {distance} KM Away</p>
        )}
        <p style={{ margin: "8px 0", color: "#777" }}>
          🎉 {hotel.supportedEvents.join(", ")}
        </p>
        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "linear-gradient(90deg, #B76E79, #FFB6B9)",
            border: "none",
            borderRadius: "30px",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
            width: "100%",
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/hotels/${hotelFolder}`);
          }}
          onMouseEnter={(e) => (e.target.style.background = "linear-gradient(90deg, #FFB6B9, #B76E79)")}
          onMouseLeave={(e) => (e.target.style.background = "linear-gradient(90deg, #B76E79, #FFB6B9)")}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default HotelCard;
