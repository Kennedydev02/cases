import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './ClientCard.css';

function ClientCard({ client }) {
  return (
    <div className="client-card">
      <div className="client-header">
        <div className="client-avatar">
          <FaUser />
        </div>
        <div className="client-status">Active</div>
      </div>
      <div className="client-info">
        <h3>John Doe</h3>
        <div className="info-item">
          <FaPhone /> <span>+254 712 345 678</span>
        </div>
        <div className="info-item">
          <FaEnvelope /> <span>john@example.com</span>
        </div>
        <div className="info-item">
          <FaClock /> <span>Created: Jan 5, 2024</span>
        </div>
      </div>
      <div className="client-actions">
        <button className="view-details">View Details</button>
      </div>
    </div>
  );
}

export default ClientCard;