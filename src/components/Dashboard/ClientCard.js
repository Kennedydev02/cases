import React from 'react';
import { FiCreditCard, FiFileText, FiClock, FiDollarSign, FiCalendar, FiTag } from 'react-icons/fi';
import { useModal } from '../../contexts/ModalContext';
import QuickPaymentModal from '../Client/modals/QuickPaymentModal';
import CaseDetails from '../Client/CaseDetails';
import './ClientCard.css';

function ClientCard({ client }) {
  const { showModal, hideModal } = useModal();

  const getStatusStyle = (status) => {
    const styles = {
      active: { background: '#DCFCE7', color: '#166534', dot: '#22C55E' },
      pending: { background: '#FEF3C7', color: '#92400E', dot: '#F59E0B' },
      completed: { background: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' }
    };
    return styles[status?.toLowerCase()] || { background: '#F3F4F6', color: '#374151', dot: '#6B7280' };
  };

  const statusStyle = getStatusStyle(client.status);

  const handleShowPayment = () => {
    showModal(
      <QuickPaymentModal
        client={client}
        onClose={() => hideModal()}
        onSave={(data) => {
          console.log('Payment saved:', data);
          hideModal();
        }}
      />
    );
  };

  const handleShowDetails = () => {
    showModal(
      <CaseDetails
        client={client}
        onClose={() => hideModal()}
      />
    );
  };

  return (
    <div className="client-card">
      <div className="card-content">
        <div className="card-header">
          <div className="header-top">
            <h3 className="client-name">{client.name}</h3>
            <div 
              className="status-badge"
              style={{ 
                backgroundColor: statusStyle.background,
                color: statusStyle.color
              }}
            >
              <span 
                className="status-dot"
                style={{ backgroundColor: statusStyle.dot }}
              />
              {client.status}
            </div>
          </div>
          <div className="case-number">
            <FiTag className="icon" />
            <span>Case #{client.caseId}</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <FiDollarSign className="info-icon" />
            <div className="info-content">
              <span className="info-label">Balance Due</span>
              <span className="info-value">
                ${client.balanceDue?.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="info-item">
            <FiCalendar className="info-icon" />
            <div className="info-content">
              <span className="info-label">Next Payment</span>
              <span className="info-value">
                {client.nextPaymentDate || 'Not set'}
              </span>
            </div>
          </div>
          
          <div className="info-item">
            <FiClock className="info-icon" />
            <div className="info-content">
              <span className="info-label">Last Updated</span>
              <span className="info-value">
                {client.lastUpdated || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="card-actions">
          <button 
            className="action-button primary"
            onClick={handleShowPayment}
          >
            <FiCreditCard />
            <span>Quick Payment</span>
          </button>
          
          <button 
            className="action-button secondary"
            onClick={handleShowDetails}
          >
            <FiFileText />
            <span>Case Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;