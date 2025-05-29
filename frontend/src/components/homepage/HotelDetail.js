// HotelDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Calendar from "react-calendar";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-calendar/dist/Calendar.css";
import "./HotelDetail.css";

function HotelDetail() {
  const { hotelName } = useParams();
  const [hotel, setHotel] = useState(null);
  const [description, setDescription] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userInfo, setUserInfo] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
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

    axios.get("http://localhost:5000/get-user-info").then((res) => {
      if (res.data.success) {
        setUserInfo({ fullName: res.data.username, email: res.data.email });
      }
    });

    axios
      .get(`http://localhost:5000/hotel/${hotelName}/booked-dates`)
      .then((response) => {
        const booked = response.data.map((dateStr) => new Date(dateStr));
        setBookedDates(booked);
        setLoading(false);
      });
  }, [hotelName]);

  const handleDateChange = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setSelectedDate(formattedDate);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }

    navigate(`/book/${hotel.name}`, {
      state: {
        selectedDate,
        fullName: userInfo.fullName,
        email: userInfo.email,
      },
    });
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return (
        bookedDates.some(
          (booked) =>
            booked.getFullYear() === date.getFullYear() &&
            booked.getMonth() === date.getMonth() &&
            booked.getDate() === date.getDate()
        ) || date < new Date()
      );
    }
    return false;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!hotel) return <div className="loading">Hotel not found</div>;

  return (
    <>
      <div className="pageWrapper">
        <div className="hotelContentWrapper">
          <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
            dynamicHeight={false}
            emulateTouch
            className="carousel"
          >
            {[1, 2, 3].map((num) => (
              <div key={num}>
                <img
                  src={`/venues/${hotel.name}/photos/N${num}.jpg`}
                  alt={`Venue ${num}`}
                  className="carouselImage"
                />
              </div>
            ))}
          </Carousel>

          <div className="rightPanel">
            <div className="mainCard animate__animated animate__fadeInUp">
              <h1 className="hotelName">{hotel.name}</h1>
              <p className="detail"><strong>📍 Area:</strong> {hotel.area}</p>
              <p className="detail"><strong>🎉 Events Supported:</strong> {hotel.supportedEvents.join(", ")}</p>
              <p className="detail"><strong>👥 Capacity:</strong> {hotel.capacity} guests</p>
              <p className="detail"><strong>💰 Price:</strong> ₹{hotel.price}</p>
            </div>

            
          </div>
        </div>

        <div className="calendarWrapper animate__animated animate__zoomIn">
          <h3 className="subHeading">🗓 Select a Date:</h3>
          <div className="custom-calendar">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate ? new Date(selectedDate) : null}
              tileDisabled={tileDisabled}
              minDate={new Date()}
              className="react-calendar"
            />
          </div>
        </div>

        <div className="bookNowWrapper centeredButton">
          <button onClick={handleBookNow} className="bookButton">
            Book Now
          </button>
        </div>

        <div className="descriptionBox animate__animated animate__fadeIn">
          <h3 className="subHeading">📝 Description</h3>
          <ul className="descriptionList">
            {description.split('\n').map((line, index) =>
              line.trim() ? <li key={index}>{line.trim()}</li> : null
            )}
          </ul>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setChatVisible(!chatVisible)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "white",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          zIndex: 1001,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/customer-service.png" alt="Chat" style={{ width: "28px", height: "28px" }} />
      </button>

      {/* Chatbot iframe with slide animation */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: chatVisible ? "30px" : "-420px",
          transition: "right 0.4s ease",
          width: "380px",
          height: "520px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          zIndex: 1000,
          backgroundColor: "#fff",
        }}
      >
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/BCvxhhDDzW1eAmAcmJNbD"
          title="Chatbot"
          width="100%"
          height="100%"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>
    </>
  );
}

export default HotelDetail;
