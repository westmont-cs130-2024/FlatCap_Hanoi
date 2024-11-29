import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function DebtModal({ debt, onClose, onSave, onDelete }) {
  const [editedDebt, setEditedDebt] = useState({
    name: debt.name,
    total_amount: debt.total_amount,
    amount_paid: debt.amount_paid,
    category: debt.category,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const allowedCategories = ["Loan", "Mortgage", "Credit Card", "Medical", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDebt({
      ...editedDebt,
      [name]: value,
    });
  };

  const validate = () => {
    const { name, total_amount, amount_paid, category } = editedDebt;
    const totalAmount = parseFloat(total_amount) || 0;
    const amountPaid = parseFloat(amount_paid) || 0;

    if (!name || total_amount === '' || amount_paid === '' || !category) {
      return 'All fields are required.';
    }
    if (totalAmount < 0 || amountPaid < 0) {
      return 'Amounts cannot be negative.';
    }
    if (amountPaid > totalAmount) {
      return 'Amount paid cannot exceed total amount.';
    }
    return ''; // No errors
  };

  const handleSave = () => {
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const totalAmount = parseFloat(editedDebt.total_amount);
    const amountPaid = parseFloat(editedDebt.amount_paid);

    const status =
      amountPaid >= totalAmount
        ? "Paid"
        : amountPaid > 0
        ? "Partially Paid"
        : "Unpaid";

    onSave({ ...editedDebt, status }); // Include calculated status when saving
    setErrorMessage('');
    onClose();
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this debt?');
    if (confirmed) {
      onDelete(debt.id);
      onClose();
    }
  };

  const totalAmount = parseFloat(editedDebt.total_amount) || 0;
  const amountPaid = parseFloat(editedDebt.amount_paid) || 0;

  const status =
    totalAmount || amountPaid >= 0
      ? amountPaid >= totalAmount
        ? "Paid"
        : amountPaid > 0
        ? "Partially Paid"
        : "Unpaid"
      : "";

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Debt - {debt.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label className="fw-bold">
              Debt Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedDebt.name}
              onChange={handleChange}
              placeholder="Enter debt name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold">
              Total Amount <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="total_amount"
              value={editedDebt.total_amount}
              onChange={handleChange}
              placeholder="Enter total amount"
              min="0"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold">
              Amount Paid <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="amount_paid"
              value={editedDebt.amount_paid}
              onChange={handleChange}
              placeholder="Enter amount paid"
              min="0"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold">
              Category <span className="text-danger">*</span>
            </Form.Label>
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
            <Form.Label className="fw-bold">Status:</Form.Label>
            <p
              className={`mb-0 ${
                status === "Paid"
                  ? "text-success"
                  : status === "Partially Paid"
                  ? "text-warning"
                  : "text-danger"
              }`}
            >
              <strong>{status}</strong>
            </p>
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