import React, { useState } from 'react';
import axios from 'axios';

function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/book', formData);
      alert('Booking successful!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        timeSlot: ''
      });
    } catch (err) {
      console.error(err);
      alert('Booking failed!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Book Your VBS Trip 🚌</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">Select Time Slot</option>
          <option value="24 Oct 12:30 PM">24 Oct 12:30 PM</option>
          <option value="24 Oct 4:00 PM">24 Oct 4:00 PM</option>
          <option value="24 Oct 6:00 PM">24 Oct 6:00 PM</option>
          <option value="25 Oct 10:00 AM">25 Oct 10:00 AM</option>
          <option value="25 Oct 12:00 PM">25 Oct 12:00 PM</option>
          <option value="25 Oct 1:45 PM">25 Oct 1:45 PM</option>
          <option value="25 Oct 3:00 PM">25 Oct 3:00 PM</option>
          <option value="25 Oct 4:00 PM">25 Oct 4:00 PM</option>
          <option value="25 Oct 5:00 PM">25 Oct 5:00 PM</option>
          <option value="25 Oct 6:00 PM">25 Oct 6:00 PM</option>
          <option value="25 Oct 7:00 PM">25 Oct 7:00 PM</option>
          <option value="25 Oct 8:15 PM">25 Oct 8:15 PM</option>
          <option value="26 Oct 9:30 AM">26 Oct 9:30 AM</option>
          <option value="26 Oct 12:30 PM">26 Oct 12:30 PM</option>
          <option value="26 Oct 4:00 PM">26 Oct 4:00 PM</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default Booking;
