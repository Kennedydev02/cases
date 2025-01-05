// Location: src/components/ClientRegistration/ClientRegistration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    applicationDate: '',
    caseType: '',
    totalCharge: '',
    downPayment: '',
    paymentPlan: 'monthly',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      balanceRemaining: name === 'totalCharge' || name === 'downPayment' 
        ? calculateBalance(name === 'totalCharge' ? value : prev.totalCharge, 
                         name === 'downPayment' ? value : prev.downPayment)
        : prev.balanceRemaining
    }));
  };

  const calculateBalance = (total, down) => {
    return (parseFloat(total) || 0) - (parseFloat(down) || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>New Client Registration</h2>
        <div style={styles.stepIndicator}>
          Step {step} of 3
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && (
            <div style={styles.stepContent}>
              <h3>Personal Information</h3>
              <div style={styles.formGroup}>
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={styles.stepContent}>
              <h3>Case Information</h3>
              <div style={styles.formGroup}>
                <label>Application Date *</label>
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Case Type *</label>
                <select
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Case Type</option>
                  <option value="asylum">Asylum</option>
                  <option value="workPermit">Work Permit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.stepContent}>
              <h3>Payment Information</h3>
              <div style={styles.formGroup}>
                <label>Total Charge ($) *</label>
                <input
                  type="number"
                  name="totalCharge"
                  value={formData.totalCharge}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Down Payment ($) *</label>
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Payment Plan</label>
                <select
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              {formData.balanceRemaining > 0 && (
                <div style={styles.balance}>
                  Balance Remaining: ${formData.balanceRemaining}
                </div>
              )}
            </div>
          )}

          <div style={styles.buttons}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={styles.backButton}
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={styles.nextButton}
              >
                Next
              </button>
            ) : (
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  stepIndicator: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '20px',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  nextButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  balance: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontWeight: 'bold',
  }
};

export default ClientRegistration;