// src/components/NewDebtModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function NewDebtModal({ show, onClose, onCreate }) {
  const [newDebt, setNewDebt] = useState({
    name: '',
    total_amount: '',
    amount_paid: '',
    category: '',
    status: '',
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
    setNewDebt({
      ...newDebt,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onCreate(newDebt);
    setNewDebt({
      name: '',
      total_amount: '',
      amount_paid: '',
      category: '',
      status: '',
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Debt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Debt Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newDebt.name}
              onChange={handleChange}
              placeholder="Enter debt name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Amount</Form.Label>
            <Form.Control
              type="number"
              name="total_amount"
              value={newDebt.total_amount}
              onChange={handleChange}
              placeholder="Enter total amount"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              name="amount_paid"
              value={newDebt.amount_paid}
              onChange={handleChange}
              placeholder="Enter amount paid"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newDebt.category}
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
              value={newDebt.status}
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
        <Button variant="primary" onClick={handleSubmit}>
          Create Debt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewDebtModal;
