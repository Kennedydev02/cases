import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Cases</h1>
      </div>
      
      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">
          <FaHome /> Dashboard
        </Link>
        <Link to="/register-client" className="nav-link">
          <FaUser /> New Client
        </Link>
        <Link to="/settings" className="nav-link">
          <FaCog /> Settings
        </Link>
      </div>

      <div className="navbar-user">
        <span className="user-email">{currentUser?.email}</span>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 