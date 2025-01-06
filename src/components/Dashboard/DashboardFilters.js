// Location: src/components/Dashboard/DashboardFilters.js
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './Dashboard.css';

function DashboardFilters({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) {
  return (
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

      <div className="date-filters">
        <input type="date" className="date-input" placeholder="Start Date" />
        <input type="date" className="date-input" placeholder="End Date" />
        <button className="more-filters">
          <FaFilter /> More Filters
        </button>
      </div>
    </div>
  );
}

export default DashboardFilters;