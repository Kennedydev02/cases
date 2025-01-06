import React from 'react';
import { FaUser, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './ClientCard.css';

function ClientCard({ caseData }) {
  return (
    <div className="client-card">
      <div className="client-avatar">
        <FaUser />
      </div>
      <div className={`status-badge status-${caseData.status.toLowerCase()}`}>
        {caseData.status}
      </div>
      <h3 className="client-name">{caseData.name}</h3>
      <div className="client-info">
        <div className="info-item">
          <FaPhone />
          <span>{caseData.phone}</span>
        </div>
        <div className="info-item">
          <FaEnvelope />
          <span>{caseData.email}</span>
        </div>
        <div className="info-item">
          <FaClock />
          <span>Created: {caseData.created}</span>
        </div>
      </div>
      <button className="view-details">View Details</button>
    </div>
  );
}

export default ClientCard;