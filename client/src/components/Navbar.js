import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <NavLink to="/" className="text-xl font-bold text-blue-700">
        VBS 🚌
      </NavLink>
      
      <div className="space-x-4">
        <NavLink to="/" className="text-gray-700 hover:text-blue-600">
          Login
        </NavLink>
        <NavLink to="/signup" className="text-gray-700 hover:text-blue-600">
          Signup
        </NavLink>
        <NavLink to="/booking" className="text-gray-700 hover:text-blue-600">
          Book Ticket
        </NavLink>
        <NavLink to="/status" className="text-gray-700 hover:text-blue-600">
          Booking Status
        </NavLink>
        <NavLink to="/cancel" className="text-gray-700 hover:text-blue-600">
          Cancel Ticket
        </NavLink>
        <button 
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
