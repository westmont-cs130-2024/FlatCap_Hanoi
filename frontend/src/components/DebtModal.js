// src/components/DebtModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DebtModal({ debt, onClose, onSave, onDelete }) {
  // State for the debt fields, initialized to the values of the current debt
  const [editedDebt, setEditedDebt] = useState({
    name: debt.name,
    total_amount: debt.total_amount,
    amount_paid: debt.amount_paid,
    category: debt.category,
    status: debt.status,
  });

  const allowedCategories = [
    "Loan",
    "Mortgage",
    "Credit Card",
    "Medical",
    "Other"
  ];

  const allowedStatus = [
    "Paid",
    "Unpaid"
  ];

  const handleChange = (e) => {
    setEditedDebt({
      ...editedDebt,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(editedDebt); // Trigger save with updated debt details
    onClose();
  };

  const handleDelete = () => {
    onDelete(debt.id); // Trigger delete for the debt
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Debt - {debt.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Debt Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedDebt.name}
              onChange={handleChange}
              placeholder="Enter debt name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount_outstanding"
              value={editedDebt.total_amount}
              onChange={handleChange}
              placeholder="Enter total amount"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              name="amount_paid"
              value={editedDebt.amount_paid}
              onChange={handleChange}
              placeholder="Enter amount paid"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={editedDebt.category}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              {allowedCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={editedDebt.status}
              onChange={handleChange}
            >
              <option value="">Select a Status</option>
              {allowedStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
              </Form.Control>
                </Form.Group>
                </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DebtModal;
