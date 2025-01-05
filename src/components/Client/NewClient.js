import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiDollarSign,
  FiSave,
  FiX,
  FiFileText
} from 'react-icons/fi';

function NewClient() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    applicationDate: new Date().toISOString().split('T')[0],
    totalAmount: '',
    initialPayment: '',
    workPermitDays: '',
    notes: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      addNotification('Name is required', 'error');
      return false;
    }
    if (!formData.phone.trim()) {
      addNotification('Phone number is required', 'error');
      return false;
    }
    if (!formData.workPermitDays) {
      addNotification('Work permit days is required', 'error');
      return false;
    }
    if (!formData.totalAmount) {
      addNotification('Total amount is required', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      // API call would go here
      // await createClient(formData);
      
      addNotification('Client added successfully', 'success');
      navigate('/');
    } catch (error) {
      addNotification(error.message || 'Error adding client', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>New Client Registration</h1>
        <button 
          onClick={() => navigate('/')}
          style={styles.closeButton}
          aria-label="Close"
        >
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          {/* Personal Information Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FiUser style={styles.sectionIcon} />
              Personal Information
            </h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Full Name *
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter client's full name"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter email address"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Phone Number *
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter phone number"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Address
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Enter client's address"
                  rows={4}
                />
              </label>
            </div>
          </div>

          {/* Case Information Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FiFileText style={styles.sectionIcon} />
              Case Information
            </h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Application Date *
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Work Permit Days *
                <input
                  type="number"
                  name="workPermitDays"
                  value={formData.workPermitDays}
                  onChange={handleChange}
                  required
                  min="1"
                  style={styles.input}
                  placeholder="Enter days until work permit"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Total Amount *
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  style={styles.input}
                  placeholder="Enter total case amount"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Initial Payment
                <input
                  type="number"
                  name="initialPayment"
                  value={formData.initialPayment}
                  onChange={handleChange}
                  min="0"
                  max={formData.totalAmount}
                  style={styles.input}
                  placeholder="Enter initial payment amount"
                />
              </label>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Notes
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Enter any additional notes"
                  rows={4}
                />
              </label>
            </div>
          </div>
        </div>

        <div style={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            style={styles.cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit"
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            <FiSave />
            {isSubmitting ? 'Saving...' : 'Save Client'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem',
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
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#374151',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sectionIcon: {
    color: '#6B7280',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    width: '100%',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
    },
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #E5E7EB',
    fontSize: '0.875rem',
    color: '#111827',
    width: '100%',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
    },
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '2rem',
    paddingTop: '2rem',
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
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#F9FAFB',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
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
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#4338CA',
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
};

export default NewClient;