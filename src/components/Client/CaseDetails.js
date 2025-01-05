import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiUser, FiDollarSign, FiEdit2, FiFileText, FiCreditCard } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import EditDetailsModal from './modals/EditDetailsModal';
import ManageDocumentsModal from './modals/ManageDocumentsModal';
import QuickPaymentModal from './modals/QuickPaymentModal';

function CaseDetails({ client, onClose }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleEditSave = (updatedData) => {
    console.log('Updated client data:', updatedData);
    setShowEditModal(false);
  };

  const handlePaymentSave = (paymentData) => {
    console.log('Payment processed:', paymentData);
    setShowPaymentModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      style={styles.overlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        style={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Case Details</h2>
          <button onClick={onClose} style={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        {/* Personal Information Section */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FiUser style={styles.sectionIcon} />
            Personal Information
          </h3>
          
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <p style={styles.value}>{client.name}</p>
            </div>
            
            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <span style={{
                ...styles.status,
                backgroundColor: '#FEF3C7',
                color: '#92400E'
              }}>
                {client.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actions}>
          <button 
            style={styles.paymentButton}
            onClick={() => setShowPaymentModal(true)}
          >
            <FiCreditCard /> Quick Payment
          </button>
          <button 
            style={styles.editButton}
            onClick={() => setShowEditModal(true)}
          >
            <FiEdit2 /> Edit Details
          </button>
          <button 
            style={styles.documentsButton}
            onClick={() => setShowDocumentsModal(true)}
          >
            <FiFileText /> Manage Documents
          </button>
        </div>

        <AnimatePresence>
          {showEditModal && (
            <EditDetailsModal
              client={client}
              onClose={() => setShowEditModal(false)}
              onSave={handleEditSave}
            />
          )}
          {showDocumentsModal && (
            <ManageDocumentsModal
              client={client}
              onClose={() => setShowDocumentsModal(false)}
            />
          )}
          {showPaymentModal && (
            <QuickPaymentModal
              client={client}
              onClose={() => setShowPaymentModal(false)}
              onSave={handlePaymentSave}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '2rem',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#111827',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sectionIcon: {
    color: '#6B7280',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    color: '#6B7280',
  },
  value: {
    fontSize: '1rem',
    color: '#111827',
    fontWeight: '500',
  },
  status: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '1.5rem',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#059669',
    },
  },
  documentsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6B7280',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#4B5563',
    },
  },
  paymentButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6366F1',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#4F46E5',
    },
  },
};

export default CaseDetails; 