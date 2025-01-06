// Location: src/components/Dashboard/DashboardFilters.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Dashboard.css';

function DashboardFilters({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
  return (
    <div className="dashboard-filters">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="status-filters">
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
  );
}

export default DashboardFilters;