import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function HotelDetail() {
  const { hotelName } = useParams(); // hotel name from URL
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
          // Load description text
          fetch(`/venues/${found.name}/description/desc.txt`)
            .then((res) => res.text())
            .then((text) => setDescription(text));
        }
      });
  }, [hotelName]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
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
