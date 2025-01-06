import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import ClientCard from './ClientCard';
import DashboardFilters from './DashboardFilters';
import DashboardMetrics from './DashboardMetrics';
import NewClient from '../Client/NewClient';
import './Dashboard.css';

function Dashboard() {
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewClient = () => {
    setShowNewClientModal(true);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <DashboardMetrics />
        <div className="dashboard-actions">
          <DashboardFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button className="new-client-btn" onClick={handleNewClient}>
            Add New Case
          </button>
        </div>
        <div className="client-cards-grid">
          <ClientCard />
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