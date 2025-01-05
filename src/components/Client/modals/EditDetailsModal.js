import React, { useState } from 'react';
import { FiX, FiSave, FiUser, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

function EditDetailsModal({ client, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    city: client?.city || '',
    state: client?.state || '',
    zipCode: client?.zipCode || '',
    status: client?.status || 'pending',
    workPermitExpiry: client?.workPermitExpiry || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
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
            <FiUser style={styles.titleIcon} /> Edit Client Details
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name *</label>
              <div style={styles.inputWrapper}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  style={{
                    ...styles.input,
                    borderColor: errors.firstName ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Enter first name"
                />
              </div>
              {errors.firstName && (
                <span style={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name *</label>
              <div style={styles.inputWrapper}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  style={{
                    ...styles.input,
                    borderColor: errors.lastName ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Enter last name"
                />
              </div>
              {errors.lastName && (
                <span style={styles.errorText}>{errors.lastName}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <div style={styles.inputWrapper}>
                <FiMail style={styles.inputIcon} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    ...styles.input,
                    borderColor: errors.email ? '#ef4444' : '#e5e7eb'
                  }}
                  placeholder="Enter email"
                />
              </div>
              {errors.email && (
                <span style={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <div style={styles.inputWrapper}>
                <FiPhone style={styles.inputIcon} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={styles.input}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div style={styles.formGroupFull}>
              <label style={styles.label}>Address</label>
              <div style={styles.inputWrapper}>
                <FiMapPin style={styles.inputIcon} />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={styles.input}
                  placeholder="Enter street address"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                style={styles.input}
                placeholder="Enter city"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                style={styles.input}
                placeholder="Enter state"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                style={styles.input}
                placeholder="Enter ZIP code"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                style={styles.select}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" style={styles.submitButton}>
              <FiSave /> Save Changes
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
    maxWidth: '800px',
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
    color: '#10B981',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  formGroupFull: {
    gridColumn: '1 / -1',
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
      borderColor: '#10B981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    },
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#10B981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
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
    backgroundColor: '#10B981',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#059669',
    },
  },
};

export default EditDetailsModal; 