import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
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
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
          <span>Client Manager</span>
        </Link>

        <div className="navbar-actions">
          <button 
            className="add-client-btn"
            onClick={() => navigate('/add-client')}
          >
            <FiPlus />
            <span>Add Client</span>
          </button>

          <div className="user-menu">
            <div className="user-info">
              <span className="user-name">{user?.email}</span>
              <div className="user-avatar">
                <FiUser />
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 