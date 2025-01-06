import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditDetailsModal from './modals/EditDetailsModal';
import QuickPaymentModal from './modals/QuickPaymentModal';
import RecordPaymentModal from './modals/RecordPaymentModal';

function CaseDetails() {
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [showRecordPayModal, setShowRecordPayModal] = useState(false);

  const caseDetails = {
    id: id,
    clientName: "John Doe",
    caseType: "Civil",
    status: "Active",
    description: "Property dispute case",
    filingDate: "2024-01-15"
  };

  return (
    <div className="case-details-container">
      <div className="case-header">
        <h2>Case Details - {caseDetails.clientName}</h2>
        <div className="action-buttons">
          <button onClick={() => setShowEditModal(true)}>Edit Details</button>
          <button onClick={() => setShowQuickPayModal(true)}>Quick Payment</button>
          <button onClick={() => setShowRecordPayModal(true)}>Record Payment</button>
        </div>
      </div>

      {/* Case Information */}
      <div className="case-info">
        <div className="info-section">
          <h3>Basic Information</h3>
          <p><strong>Case ID:</strong> {id}</p>
          <p><strong>Client Name:</strong> {caseDetails.clientName}</p>
          <p><strong>Case Type:</strong> {caseDetails.caseType}</p>
          <p><strong>Status:</strong> {caseDetails.status}</p>
          <p><strong>Filing Date:</strong> {caseDetails.filingDate}</p>
        </div>
      </div>

      {/* Modals */}
      <EditDetailsModal 
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        caseDetails={caseDetails}
      />

      <QuickPaymentModal
        show={showQuickPayModal}
        handleClose={() => setShowQuickPayModal(false)}
        caseId={id}
      />

      <RecordPaymentModal
        show={showRecordPayModal}
        handleClose={() => setShowRecordPayModal(false)}
        caseId={id}
      />
    </div>
  );
}

export default CaseDetails; 