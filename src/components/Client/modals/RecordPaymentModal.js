import React, { useState } from 'react';
import { FiX, FiDollarSign, FiCheck, FiCreditCard, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';

function RecordPaymentModal({ client, onClose, onSave }) {
  const [payment, setPayment] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'cash',
    notes: '',
    reference: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!payment.amount) newErrors.amount = 'Amount is required';
    if (payment.amount > client.balanceDue) {
      newErrors.amount = 'Amount cannot exceed balance due';
    }
    if (!payment.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(payment);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      style={styles.overlay}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        style={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>
            <FiDollarSign style={styles.titleIcon} /> Record Payment
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <div style={styles.balanceInfo}>
          <div style={styles.balanceItem}>
            <span style={styles.balanceLabel}>Total Amount</span>
            <span style={styles.balanceValue}>
              ${client.totalAmount?.toLocaleString()}
            </span>
          </div>
          <div style={styles.balanceItem}>
            <span style={styles.balanceLabel}>Balance Due</span>
            <span style={styles.balanceValue}>
              ${client.balanceDue?.toLocaleString()}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Payment Amount *
              <div style={styles.inputWrapper}>
                <FiDollarSign style={styles.inputIcon} />
                <input
                  type="number"
                  value={payment.amount}
                  onChange={(e) => setPayment({...payment, amount: e.target.value})}
                  style={{
                    ...styles.input,
                    borderColor: errors.amount ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Enter amount"
                  step="0.01"
                  min="0"
                  max={client.balanceDue}
                />
              </div>
              {errors.amount && (
                <span style={styles.errorText}>{errors.amount}</span>
              )}
            </label>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Payment Date
                <div style={styles.inputWrapper}>
                  <FiCalendar style={styles.inputIcon} />
                  <input
                    type="date"
                    value={payment.date}
                    onChange={(e) => setPayment({...payment, date: e.target.value})}
                    style={styles.input}
                  />
                </div>
              </label>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Payment Method
                <div style={styles.inputWrapper}>
                  <FiCreditCard style={styles.inputIcon} />
                  <select
                    value={payment.method}
                    onChange={(e) => setPayment({...payment, method: e.target.value})}
                    style={styles.select}
                  >
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="check">Check</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </label>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Reference Number
              <input
                type="text"
                value={payment.reference}
                onChange={(e) => setPayment({...payment, reference: e.target.value})}
                style={styles.input}
                placeholder="Check number, transaction ID, etc."
              />
            </label>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Notes
              <textarea
                value={payment.notes}
                onChange={(e) => setPayment({...payment, notes: e.target.value})}
                style={styles.textarea}
                placeholder="Add any payment notes..."
                rows={4}
              />
            </label>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.submitButton}>
              <FiCheck /> Record Payment
            </button>
          </div>
        </form>
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
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  titleIcon: {
    color: '#4F46E5',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  balanceInfo: {
    display: 'flex',
    gap: '2rem',
    padding: '1.5rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
  },
  balanceItem: {
    flex: 1,
  },
  balanceLabel: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '0.25rem',
  },
  balanceValue: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '0.75rem',
    color: '#6B7280',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    paddingLeft: '2.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    paddingLeft: '2.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #E5E7EB',
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#F9FAFB',
    },
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    backgroundColor: '#4F46E5',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#4338CA',
    },
  },
};

export default RecordPaymentModal;