// Location: src/components/PaymentTracking/PaymentTracking.js
import React from 'react';
import { useParams } from 'react-router-dom';

function PaymentTracking() {
  const { clientId } = useParams();

  return (
    <div className="payment-tracking">
      <h2>Payment Tracking</h2>
      <p>Client ID: {clientId}</p>
      {/* Payment tracking content will go here */}
    </div>
  );
}

export default PaymentTracking;