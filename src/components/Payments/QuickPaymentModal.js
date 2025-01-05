// Location: src/components/Payments/QuickPaymentModal.js
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useNotification } from '../../context/NotificationContext';

function QuickPaymentModal({ isOpen, onClose, client, onPaymentSubmit }) {
  const { addNotification } = useNotification();
  const [payment, setPayment] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'cash',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(payment);
    addNotification('Payment recorded successfully', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment">
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input
            type="number"
            value={payment.amount}
            onChange={e => setPayment({ ...payment, amount: e.target.value })}
            style={styles.input}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            value={payment.date}
            onChange={e => setPayment({ ...payment, date: e.target.value })}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method</label>
          <select
            value={payment.method}
            onChange={e => setPayment({ ...payment, method: e.target.value })}
            style={styles.input}
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="check">Check</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notes</label>
          <textarea
            value={payment.notes}
            onChange={e => setPayment({ ...payment, notes: e.target.value })}
            style={{ ...styles.input, minHeight: '100px' }}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" style={styles.submitButton}>
            Record Payment
          </button>
        </div>
      </form>
    </Modal>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
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
  input: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    background: 'white',
    color: '#374151',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
  }
};

export default QuickPaymentModal;