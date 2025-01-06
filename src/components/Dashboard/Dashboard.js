import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import DashboardMetrics from './DashboardMetrics';
import DashboardFilters from './DashboardFilters';
import ClientCard from './ClientCard';
import NewClient from '../Client/NewClient';
import CaseDetails from '../Client/CaseDetails';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { currentUser } = useAuth();
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCaseClick = (caseId) => {
    setSelectedCase(caseId);
    setShowCaseDetails(true);
  };

  const cases = [
    {
      id: 1,
      clientName: "John Doe",
      caseType: "Civil",
      status: "Active",
      date: "2024-01-15"
    },
    // Add more cases as needed
  ];

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <DashboardMetrics />
        
        <div className="dashboard-header">
          <DashboardFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button 
            className="add-case-btn"
            onClick={() => setShowNewClientModal(true)}
          >
            Add New Case
          </button>
        </div>

        <div className="cases-grid">
          {cases.map(caseItem => (
            <ClientCard 
              key={caseItem.id}
              caseData={caseItem}
              onClick={() => handleCaseClick(caseItem.id)}
            />
          ))}
        </div>

        {showNewClientModal && (
          <NewClient 
            show={showNewClientModal}
            onClose={() => setShowNewClientModal(false)}
          />
        )}

        {showCaseDetails && (
          <CaseDetails 
            show={showCaseDetails}
            onClose={() => setShowCaseDetails(false)}
            caseId={selectedCase}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;