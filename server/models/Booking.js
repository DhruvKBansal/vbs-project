const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String, // added
  timeSlot: String, // added
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
