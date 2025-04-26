import React, { useState } from "react";
import "./wedding.css"; // Ensure your CSS file is in the correct path

const Wedding = () => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [availableDates, setAvailableDates] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Available dates by month
  const calendarHash = {
    January: ["2024-01-05", "2024-01-11", "2024-01-17", "2024-01-23", "2024-01-28"],
    February: ["2024-02-01", "2024-02-06", "2024-02-14", "2024-02-22"],
    March: ["2024-03-02", "2024-03-08", "2024-03-12", "2024-03-18", "2024-03-24"],
    April: ["2024-04-01", "2024-04-07", "2024-04-13", "2024-04-18", "2024-04-23"],
    May: ["2024-05-01", "2024-05-06", "2024-05-11", "2024-05-17", "2024-05-22"],
    June: ["2024-06-03", "2024-06-09", "2024-06-14", "2024-06-18", "2024-06-26"],
    July: ["2024-07-01", "2024-07-05", "2024-07-11", "2024-07-16", "2024-07-23"],
    August: ["2024-08-04", "2024-08-10", "2024-08-14", "2024-08-19", "2024-08-25"],
    September: ["2024-09-02", "2024-09-07", "2024-09-13", "2024-09-18", "2024-09-21"],
    October: ["2024-10-01", "2024-10-06", "2024-10-14", "2024-10-18"],
    November: ["2024-11-02", "2024-11-06", "2024-11-13", "2024-11-18", "2024-11-24"],
    December: ["2024-12-01", "2024-12-05", "2024-12-13", "2024-12-17", "2024-12-23"],
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

      <div class="carousel">
      <div class="slides">
        <img src="/assets/wed2.jpg" alt="Image 1" />
        <img src="/assets/wed1.jpg" alt="Image 2" />
        <img src="/assets/wed3.jpeg" alt="Image 3" />
        <img src="/assets/wed4.jpeg" alt="Image 4" />
      </div>
    </div>

      {/* Description */}
      <div className="description" style={{ textAlign: "center" }}>
        <h1 className="animated fadeIn">Celebrate Your Special Day with Us!</h1>
        <p
          className="animated fadeIn delay-1s"
          style={{ fontSize: "20px", color: "rgb(255, 255, 255)" }}
        >
  "A wedding is a day to remember forever, and we're here to make it unforgettable."
  </p>
      </div>

      {/* Availability Section */}
      <div className="row2">
        <div className="col2 animated fadeInLeft">
          <h1>Check Venue Availability</h1>
          <p>
          Planning your dream wedding? Select a month to find the perfect date for your special day. Let us make your big day magical!

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
      <h3>Hit the button below to book your wedding!</h3>
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

export default Wedding;
