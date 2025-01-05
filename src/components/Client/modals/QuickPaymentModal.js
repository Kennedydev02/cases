import React, { useState } from 'react';
import { FiX, FiDollarSign, FiCalendar, FiCreditCard, FiHash, FiCheck, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './QuickPaymentModal.css';

function QuickPaymentModal({ client, onClose, onSave }) {
  const [payment, setPayment] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'cash',
    reference: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = 'Amount is required';
    } else if (parseFloat(values.amount) <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(values.amount) > client.balanceDue) {
      errors.amount = 'Amount cannot exceed balance due';
    }
    if (!values.date) errors.date = 'Date is required';
    if (!values.method) errors.method = 'Payment method is required';
    return errors;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate(payment));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(payment);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        onSave(payment);
      } catch (error) {
        console.error('Error saving payment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <motion.div 
      className="quick-payment-modal"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
    >
      <div className="modal-header">
        <div className="header-content">
          <div className="avatar">
            {client.name.charAt(0)}
          </div>
          <div className="header-text">
            <h2>Record Payment</h2>
            <p>{client.name}</p>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="modal-body">
        <motion.div 
          className="balance-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="balance-label">Balance Due</span>
          <span className="balance-amount">${client.balanceDue?.toLocaleString()}</span>
        </motion.div>

        <form onSubmit={handleSubmit} className="payment-form">
          <motion.div 
            className={`form-field ${errors.amount && touched.amount ? 'error' : ''}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label>
              Payment Amount <span className="required">*</span>
            </label>
            <div className="input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                value={payment.amount}
                onChange={(e) => {
                  setPayment({ ...payment, amount: e.target.value });
                  if (touched.amount) setErrors(validate({ ...payment, amount: e.target.value }));
                }}
                onBlur={() => handleBlur('amount')}
                placeholder="Enter amount"
                required
                step="0.01"
                min="0"
                max={client.balanceDue}
              />
              <AnimatePresence>
                {touched.amount && !errors.amount && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="validation-icon success"
                  >
                    <FiCheck />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {touched.amount && errors.amount && (
              <motion.span
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.amount}
              </motion.span>
            )}
          </motion.div>

          <div className="form-field">
            <label>
              Payment Date <span className="required">*</span>
            </label>
            <div className="input-container">
              <FiCalendar className="field-icon" />
              <input
                type="date"
                value={payment.date}
                onChange={(e) => setPayment({ ...payment, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>
              Payment Method <span className="required">*</span>
            </label>
            <div className="input-container">
              <FiCreditCard className="field-icon" />
              <select
                value={payment.method}
                onChange={(e) => setPayment({ ...payment, method: e.target.value })}
                required
              >
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="credit">Credit Card</option>
                <option value="transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Reference Number</label>
            <div className="input-container">
              <FiHash className="field-icon" />
              <input
                type="text"
                value={payment.reference}
                onChange={(e) => setPayment({ ...payment, reference: e.target.value })}
                placeholder="Check number, transfer reference, etc."
              />
            </div>
          </div>

          <div className="form-field">
            <label>Notes</label>
            <textarea
              value={payment.notes}
              onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
              placeholder="Add any additional notes..."
              rows="3"
            />
          </div>
        </form>
      </div>

      <div className="modal-footer">
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="spinner" />
              Processing...
            </>
          ) : (
            'Record Payment'
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default QuickPaymentModal; 