import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from 'axios';
import './book.css';

const EventBookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showReceipt, setShowReceipt] = useState(false);

  const { selectedDate, fullName, email } = location.state || {};
  const bookingID = `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  const [formData, setFormData] = useState({
    fullName: fullName || '',
    aadharNumber: '',
    phoneNumber: '',
    gender: '',
    age: '',
    address: '',
    email: email || '',
    eventDate: selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : '',
    event: '',
    hall: '',
    BID: bookingID
  });

  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    const url = window.location.pathname;
    const hotelName = decodeURIComponent(url.split("/book/")[1]);
    setFormData((prev) => ({
      ...prev,
      hall: hotelName,
    }));
  }, [selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value
    }));
  };

  const validateForm = () => {
    const { aadharNumber, phoneNumber, gender, age, address, event, hall } = formData;

    if (!aadharNumber || !phoneNumber || !gender || !age || !address || !event || !hall) {
      alert('Please fill all the fields!');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number!');
      return false;
    }

    return true;
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const orderResponse = await axios.post('http://localhost:5000/create-order', { amount: 100 });
      const { amount, id: order_id, currency } = orderResponse.data;

      const options = {
        key: 'rzp_test_iJR7LQJdRvW30C',
        amount: amount.toString(),
        currency: currency,
        name: 'Event Management System',
        description: 'Booking Payment',
        order_id: order_id,
        handler: async function (response) {
          const updatedData = {
            ...formData,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          };

          setPaymentId(response.razorpay_payment_id);

          await submitBooking(updatedData);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phoneNumber
        },
        notes: {
          booking_id: formData.BID
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Something went wrong while initiating payment.");
    }
  };

  const submitBooking = async (data) => {
    try {
      // Save in main Booking collection
      await axios.post('http://localhost:5000/submit-form', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Save separately in Hotel-specific collection
      await axios.post(`http://localhost:5000/hotel/${encodeURIComponent(formData.hall)}/book-date`, {
        name: data.fullName,
        email: data.email,
        selectedDate: data.eventDate,
        event: data.event,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Booking successful!');
      setFormData(data);
      setShowReceipt(true);
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Booking Receipt', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Thank you for booking with us!', 105, 30, { align: 'center' });

    const receiptData = [
      ['Field', 'Details'],
      ['Name', formData.fullName],
      ['Aadhar Number', formData.aadharNumber],
      ['Phone', formData.phoneNumber],
      ['Gender', formData.gender],
      ['Age', formData.age],
      ['Email', formData.email],
      ['Address', formData.address],
      ['Event Date', formData.eventDate],
      ['Event Type', formData.event],
      ['Venue', formData.hall],
      ['Booking ID', formData.BID],
      ['Payment ID', paymentId],
    ];

    doc.autoTable({
      head: [receiptData[0]],
      body: receiptData.slice(1),
      margin: { top: 40 }
    });

    doc.save('receipt.pdf');
  };

  const resetForm = () => {
    navigate(-1); // go back to hotel detail
  };

  const goHome = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      {!showReceipt ? (
        <div className="form-container">
          <h2>Event Booking Form</h2>
          <form onSubmit={handleBooking}>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullName" value={formData.fullName} disabled />

            <label htmlFor="aadharNumber">Aadhar Number</label>
            <input type="text" id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />

            <div className="radio-group">
              <label>Gender</label>
              <div className="radio-container">
                <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleRadioChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleRadioChange} />
                <label htmlFor="female">Female</label>
                <input type="radio" id="other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleRadioChange} />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" min="18" max="70" value={formData.age} onChange={handleChange} />

            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} disabled />

            <label htmlFor="date">Event Date</label>
            <input type="date" id="date" name="eventDate" value={formData.eventDate} disabled />

            <label htmlFor="event">Event Type</label>
            <select name="event" id="event" value={formData.event} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Naming Ceremony">Naming Ceremony</option>
              <option value="Kitty Party">Kitty Party</option>
              <option value="Official Meetings">Official Meetings</option>
              <option value="Concert">Concert</option>
              <option value="Party">Party</option>
            </select>

            <label htmlFor="hall">Venue</label>
            <input type="text" id="hall" name="hall" value={formData.hall} disabled />

            <div className="button-container">
              <input type="submit" value="Book Now" />
              <input type="button" value="Select Another Date" onClick={resetForm} />
              <input type="button" value="Go Home" onClick={goHome} />
            </div>
          </form>
        </div>
      ) : (
        <div className="receipt-container">
          <h2>Booking Receipt</h2>
          <table>
            <tbody>
              <tr><td>Name</td><td>{formData.fullName}</td></tr>
              <tr><td>Aadhar Number</td><td>{formData.aadharNumber}</td></tr>
              <tr><td>Phone</td><td>{formData.phoneNumber}</td></tr>
              <tr><td>Gender</td><td>{formData.gender}</td></tr>
              <tr><td>Age</td><td>{formData.age}</td></tr>
              <tr><td>Email</td><td>{formData.email}</td></tr>
              <tr><td>Address</td><td>{formData.address}</td></tr>
              <tr><td>Event Date</td><td>{formData.eventDate}</td></tr>
              <tr><td>Event Type</td><td>{formData.event}</td></tr>
              <tr><td>Venue</td><td>{formData.hall}</td></tr>
              <tr><td>Booking ID</td><td>{formData.BID}</td></tr>
              <tr><td>Payment ID</td><td>{paymentId}</td></tr>
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={downloadReceipt}>Download PDF</button>
            <button onClick={goHome}>Go Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventBookingForm;