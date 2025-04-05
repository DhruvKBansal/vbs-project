// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/book', async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot } = req.body;

    const booking = new Booking({ name, email, phone, date, timeSlot });
    await booking.save();

    const sendConfirmationEmail = require('../utils/sendConfirmationEmail');
    await sendConfirmationEmail(email, date, timeSlot); // ✅ FIXED THIS LINE

    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;
