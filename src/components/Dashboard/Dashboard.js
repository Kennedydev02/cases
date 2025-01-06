import React, { useState } from 'react';
import { FaSearch, FaPlus, FaFilter } from 'react-icons/fa';
import Navbar from '../Navigation/Navbar';
import DashboardMetrics from './DashboardMetrics';
import ClientCard from './ClientCard';
import NewClient from '../Client/NewClient';
import './Dashboard.css';

function Dashboard() {
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const cases = [
    {
      id: 1,
      name: "John Doe",
      phone: "+254 712 345 678",
      email: "john@example.com",
      status: "active",
      created: "Jan 5, 2024",
      nextPayment: "2024-02-01",
      paymentStatus: "upcoming"
    },
    // Add more sample cases
  ];

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <div className="dashboard-content">
        <DashboardMetrics />

        <div className="dashboard-actions">
          <div className="search-section">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All Cases
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                Active
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filterStatus === 'closed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('closed')}
              >
                Closed
              </button>
            </div>
          </div>

          <button 
            className="add-case-btn"
            onClick={() => setShowNewClientModal(true)}
          >
            <FaPlus /> Add New Case
          </button>
        </div>

        <div className="advanced-filters">
          <div className="date-filters">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="date-input"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="date-input"
            />
          </div>
          <button className="filter-toggle">
            <FaFilter /> More Filters
          </button>
        </div>

        <div className="cases-grid">
          {cases.map(caseItem => (
            <ClientCard 
              key={caseItem.id}
              caseData={caseItem}
            />
          ))}
        </div>
      </div>

      {showNewClientModal && (
        <NewClient 
          show={showNewClientModal}
          onClose={() => setShowNewClientModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;