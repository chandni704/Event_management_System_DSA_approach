import React, { useState } from "react";
import "./wedding.css"; // Ensure your CSS file is in the correct path

const Concert = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [availableDates, setAvailableDates] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Available dates by month
  const calendarHash = {
    January: ["2024-01-03", "2024-01-10", "2024-01-18", "2024-01-25", "2024-01-30"],
    February: ["2024-02-02", "2024-02-08", "2024-02-16", "2024-02-24"],
    March: ["2024-03-02", "2024-03-09", "2024-03-13", "2024-03-18", "2024-03-22"],
    April: ["2024-04-01", "2024-04-08", "2024-04-13", "2024-04-21", "2024-04-26"],
    May: ["2024-05-03", "2024-05-07", "2024-05-14", "2024-05-20", "2024-05-29"],
    June: ["2024-06-02", "2024-06-08", "2024-06-14", "2024-06-20", "2024-06-23"],
    July: ["2024-07-01", "2024-07-09", "2024-07-15", "2024-07-23", "2024-07-30"],
    August: ["2024-08-03", "2024-08-09", "2024-08-13", "2024-08-19", "2024-08-26"],
    September: ["2024-09-02", "2024-09-06", "2024-09-11", "2024-09-18", "2024-09-24"],
    October: ["2024-10-05", "2024-10-10", "2024-10-15", "2024-10-22"],
    November: ["2024-11-04", "2024-11-12", "2024-11-17", "2024-11-23", "2024-11-29"],
    December: ["2024-12-03", "2024-12-08", "2024-12-12", "2024-12-19", "2024-12-23"],
  };
  

  // Handle calendar button click
  const handleCalendarButtonClick = () => {
    const dates = calendarHash[selectedMonth] || [];
    setAvailableDates(dates.length > 0 ? dates : ["No dates available"]);
    setIsPopupVisible(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="icon">
          <img src="/assets/icon.png" alt="Logo" />
        </div>
        <div className="home">
          <a href="/home">
            <i className="fa-solid fa-house"></i> Home
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div class="carousel">
      <div class="slides">
        <img src="/assets/party1.jpg" alt="Image 1" />
        <img src="/assets/party2.jpg" alt="Image 2" />
        <img src="/assets/party3.jpeg" alt="Image 3" />
        <img src="/assets/party4.jpg" alt="Image 4" />
      </div>
    </div>

      {/* Description */}
      <div className="description" style={{ textAlign: "center" }}>
        <h1 className="animated fadeIn">Celebrate Your Special Day with Us!</h1>
        <p
          className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(255, 255, 255)" }}
        >
  "A concert or party is the perfect way to celebrate life, and we’re here to make it spectacular."
  </p>
      </div>

      {/* Availability Section */}
      <div className="row2">
        <div className="col2 animated fadeInLeft">
          <h1>Check Venue Availability</h1>
          <p>
          Planning a concert or party? Choose a month to see when our venue is available for your event. Let’s make some noise!

          </p>
        </div>
        <div className="col2 animated fadeInRight">
          <div className="calendar-icon">
            <i className="fa-solid fa-calendar-days"></i>
          </div>
          <label htmlFor="month-select" style={{ alignSelf: "center" }}>
            Select a month:
          </label>
          <br />
          <select
  id="month-select"
  style={{ alignSelf: "center", color: "white" }}
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>

          <br />
          <button className="calendar-button" onClick={handleCalendarButtonClick}>
            Check Calendar
          </button>
        </div>
      </div>

      {/* Calendar Popup */}
      {isPopupVisible && (
        <div id="calendar-popup" className="calendar-popup">
          <div className="calendar-popup-content animated zoomIn">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="calendar">
              <h2>Available Dates</h2>
              <ul id="calendar-slots">
                {availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <div className="row3">
        <h3>Hit the button below to reserve your party!</h3>
        <button
          className="book"
          onClick={() => (window.location.href = "/booking")}
        >
          Book now
        </button>
      </div>

      {/* Footer */}
      <footer className="footer animated fadeInUp">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Concert;
