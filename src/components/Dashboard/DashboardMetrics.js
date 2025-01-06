// Location: src/components/Dashboard/DashboardMetrics.js
import React from 'react';
import { FaUsers, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Dashboard.css';

function DashboardMetrics() {
  return (
    <div className="metrics-container">
      <div className="metric-card">
        <div className="metric-icon total">
          <FaUsers />
        </div>
        <div className="metric-info">
          <h3>Total Cases</h3>
          <p>150</p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon active">
          <FaSpinner />
        </div>
        <div className="metric-info">
          <h3>Active Cases</h3>
          <p>45</p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon completed">
          <FaCheckCircle />
        </div>
        <div className="metric-info">
          <h3>Completed</h3>
          <p>89</p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon pending">
          <FaExclamationTriangle />
        </div>
        <div className="metric-info">
          <h3>Pending</h3>
          <p>16</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardMetrics;