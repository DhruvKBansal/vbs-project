require("dotenv").config();
const bookingRoutes = require('./routes/bookingRoutes');
const Booking = require('./models/Booking');
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', bookingRoutes);


// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🔥 Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ✅ API to Register User
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to Login User
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vacationbusservices@gmail.com",
    pass: "your-app-password", // Use App Password
  },
});

// ✅ API to Check Booking Status
app.post("/api/check-status", async (req, res) => {
  const { email } = req.body;
  const booking = await Booking.findOne({ email });
  if (!booking) return res.json({ message: "No booking found" });
  res.json({ message: `Your booking is ${booking.status}` });
});

// ✅ API to Cancel Ticket
app.post("/api/cancel-ticket", async (req, res) => {
  const { email } = req.body;
  const booking = await Booking.findOne({ email });

  if (!booking) return res.json({ message: "No booking found to cancel" });

  booking.status = "Cancelled";
  await booking.save();

  await transporter.sendMail({
    from: "vacationbusservices@gmail.com",
    to: email,
    subject: "Cancellation Confirmation - VBS",
    text: `Your booking for "${booking.trip}" has been cancelled.`,
  });

  res.json({ message: "Cancellation request submitted & email sent!" });
});

// Get all users
app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user details by email
app.get("/api/users/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Get all bookings
app.get("/api/bookings", async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

// Get booking status for a specific user
app.get("/api/booking/:email", async (req, res) => {
    const booking = await Booking.findOne({ email: req.params.email });
    if (!booking) return res.json({ message: "No booking found for this user." });
    res.json(booking);
});



// ✅ Start Server
app.listen(5000, () => console.log("🔥 Server running on port 5000"));
