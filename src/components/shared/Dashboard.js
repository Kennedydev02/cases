// Location: src/components/Dashboard/Dashboard.js
import { useState, useEffect } from 'react';
import './Dashboard.css';
import ClientCard from './ClientCard';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Client Dashboard</h1>
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Clients</option>
            <option value="active">Active</option>
            <option value="pending">Payment Pending</option>
            <option value="eligible">Work Permit Eligible</option>
          </select>
        </div>
      </div>
      <div className="client-grid">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;