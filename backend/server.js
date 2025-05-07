// server.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// ─── SCHEMAS & MODELS ─────────────────────────────────────────────────────

const bookingSchema = new mongoose.Schema({
  fullName: String,
  aadharNumber: String,
  phoneNumber: String,
  gender: String,
  address: String,
  age: Number,
  email: String,
  eventDate: Date,
  event: String,
  hall: String,
  BID: String,
  paymentId: String,
});
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});

// Default models
const Booking = mongoose.model('Booking', bookingSchema);
const User = mongoose.model('User', userSchema);
const OTP = mongoose.model('OTP', otpSchema);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let loggedInUserEmail = null;

// ─── UTILITY FUNCTIONS ─────────────────────────────────────────────────────

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Dynamically create model for each hotel
const getHotelBookingModel = (hotelName) => {
  const modelName = `${hotelName.replace(/\s+/g, '')}Bookings`;
  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  } else {
    return mongoose.model(modelName, new mongoose.Schema({
      name: String,
      email: String,
      selectedDate: Date,
      event: String,
    }));
  }
};

// ─── ROUTES ─────────────────────────────────────────────────────────────────

// ── OTP ROUTES ──
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Your OTP for Signup',
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error in /send-otp:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// ── SIGNUP ──
app.post('/submit-signup', async (req, res) => {
  const { email, username, password, otp } = req.body;
  if (!email || !username || !password || !otp) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const record = await OTP.findOne({ email });
    if (!record) return res.status(400).json({ success: false, message: 'No OTP requested' });
    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }
    if (record.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });

    await OTP.deleteOne({ email });

    if (await User.exists({ email })) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await new User({ email, username, password: hashed }).save();

    res.json({ success: true, message: 'Signup successful' });
  } catch (err) {
    console.error('Error in /submit-signup:', err);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// ── LOGIN ──
app.post('/submit-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    loggedInUserEmail = email;
    res.json({ success: true, message: 'Login successful' });
  } catch {
    res.status(500).json({ success: false, message: 'Error in login' });
  }
});


// ── LOGOUT ──
app.post('/logout', (_req, res) => {
  loggedInUserEmail = null;
  res.json({ message: 'Logged out' });
});

// ── GET USER INFO (✅ new added) ──
app.get('/get-user-info', async (req, res) => {
  try {
    if (!loggedInUserEmail) {
      return res.json({ success: false, message: "Not logged in" });
    }
    const user = await User.findOne({ email: loggedInUserEmail });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, email: user.email, username: user.username });
  } catch (err) {
    console.error('Error in /get-user-info:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ── PAYMENT ──
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `receipt_${Date.now()}` });
    res.json(order);
  } catch {
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
});

// ── SUBMIT BOOKING ──
app.post('/submit-form', async (req, res) => {
  try {
    await new Booking(req.body).save();
    res.json({ ok: true, message: 'Booking registered successfully' });
  } catch {
    res.status(500).json({ ok: false, message: 'Error in registration' });
  }
});

// ── FETCH USER BOOKINGS ──
app.post('/bookings', async (req, res) => {
  const { email } = req.body;
  if (email !== loggedInUserEmail) return res.status(403).json({ message: 'Unauthorized' });

  const userBookings = await Booking.find({ email });
  res.status(userBookings.length ? 200 : 404).json(userBookings);
});

// ── ADMIN ALL BOOKINGS ──
app.get('/admin/bookings', async (_req, res) => {
  try { res.json(await Booking.find({})); }
  catch { res.status(500).json({ message: 'Failed to retrieve bookings' }); }
});

// ── HOTEL BOOKINGS ──
app.post('/hotel/:hotelName/book-date', async (req, res) => {
  const { hotelName } = req.params;
  const { name, email, selectedDate, event } = req.body;

  if (!name || !email || !selectedDate || !event) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const HotelBooking = getHotelBookingModel(hotelName);
    const alreadyBooked = await HotelBooking.findOne({ selectedDate: new Date(selectedDate) });
    if (alreadyBooked) {
      return res.status(400).json({ success: false, message: 'Date already booked' });
    }
    await new HotelBooking({ name, email, selectedDate, event }).save();
    res.json({ success: true, message: 'Booking successful' });
  } catch (err) {
    console.error('Error booking hotel date:', err);
    res.status(500).json({ success: false, message: 'Booking error' });
  }
});

// ── GET BOOKED DATES ──
app.get('/hotel/:hotelName/booked-dates', async (req, res) => {
  const { hotelName } = req.params;
  try {
    const HotelBooking = getHotelBookingModel(hotelName);
    const bookings = await HotelBooking.find({});
    const dates = bookings.map(b => b.selectedDate);
    res.json(dates);
  } catch (err) {
    console.error('Error fetching booked dates:', err);
    res.status(500).json({ message: 'Failed to fetch booked dates' });
  }
});
app.get('/is-logged-in', (req, res) => {
  if (loggedInUserEmail!=null) {
    res.json({ loggedIn: true, email: loggedInUserEmail });
  } else {
    res.json({ loggedIn: false });
  }
});

// ─── SERVE REACT BUILD ─────────────────────────────────────────────────────
const buildPath = path.join(__dirname, '../frontend/emsys/build');
app.use(express.static(buildPath));
app.get('*', (_, res) => res.sendFile(path.join(buildPath, 'index.html')));

// ─── START SERVER ───────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
