// Location: src/components/Dashboard/DashboardMetrics.js
import React from 'react';
import { FiUsers, FiClock, FiDollarSign, FiAlertCircle } from 'react-icons/fi';

function DashboardMetrics({ metrics }) {
  const cards = [
    {
      title: 'Total Clients',
      value: metrics.totalClients,
      icon: FiUsers,
      color: '#2563eb'
    },
    {
      title: 'Pending Work Permits',
      value: metrics.pendingPermits,
      icon: FiClock,
      color: '#f59e0b'
    },
    {
      title: 'Total Outstanding',
      value: `$${metrics.outstandingAmount.toLocaleString()}`,
      icon: FiDollarSign,
      color: '#22c55e'
    },
    {
      title: 'Urgent Actions',
      value: metrics.urgentActions,
      icon: FiAlertCircle,
      color: '#ef4444'
    }
  ];

  return (
    <div style={styles.metricsGrid}>
      {cards.map((card, index) => (
        <div key={index} style={styles.metricCard} className="card">
          <div style={styles.metricContent}>
            <div style={styles.metricIcon}>
              <card.icon size={24} color={card.color} />
            </div>
            <div style={styles.metricInfo}>
              <h3 style={styles.metricTitle}>{card.title}</h3>
              <p style={{...styles.metricValue, color: card.color}}>{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  metricCard: {
    padding: '1.5rem',
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--border-radius-md)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  metricContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  metricIcon: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--background)',
  },
  metricInfo: {
    flex: 1,
  },
  metricTitle: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.25rem',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: 0,
  }
};

export default DashboardMetrics;