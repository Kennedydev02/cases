import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditDetailsModal({ show, handleClose, caseDetails }) {
  const [formData, setFormData] = useState({
    clientName: caseDetails?.clientName || '',
    caseType: caseDetails?.caseType || '',
    status: caseDetails?.status || '',
    description: caseDetails?.description || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Case Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Case Type</Form.Label>
            <Form.Select
              value={formData.caseType}
              onChange={(e) => setFormData({...formData, caseType: e.target.value})}
            >
              <option value="">Select Case Type</option>
              <option value="civil">Civil Case</option>
              <option value="criminal">Criminal Case</option>
              <option value="corporate">Corporate Case</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditDetailsModal; 