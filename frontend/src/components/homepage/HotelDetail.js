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

    axios.get(`http://localhost:5000/hotel/${hotelName}/booked-dates`).then((response) => {
      const booked = response.data.map((dateStr) => new Date(dateStr));
      setBookedDates(booked);
      setLoading(false);
    });
  }, [hotelName]);

  const handleDateChange = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    setSelectedDate(normalized);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }
    navigate(`/book/${hotel.name}`, {
      state: { selectedDate, fullName: userInfo.fullName, email: userInfo.email },
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
    <div className="pageWrapper">
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
              alt={`Venue ${num}`}
              className="carouselImage"
            />
          </div>
        ))}
      </Carousel>

      <div className="mainCard animate__animated animate__fadeInUp">
        <h1 className="hotelName">{hotel.name}</h1>
        <p className="detail"><strong>📍 Area:</strong> {hotel.area}</p>
        <p className="detail"><strong>🎉 Events Supported:</strong> {hotel.supportedEvents.join(", ")}</p>
      </div>

      <div className="calendarWrapper animate__animated animate__zoomIn">
        <h3 className="subHeading">🗓 Select a Date:</h3>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          className="custom-calendar"
        />
      </div>

      <div className="bookNowWrapper">
        <button onClick={handleBookNow} className="bookButton">
          Book Now
        </button>
      </div>

      <div className="descriptionBox animate__animated animate__fadeIn">
        <h3 className="subHeading">📝 Description</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default HotelDetail;
