import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function NewDebtModal({ show, onClose, onCreate }) {
  const [newDebt, setNewDebt] = useState({
    name: '',
    total_amount: '',
    amount_paid: '',
    category: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const allowedCategories = ["Loan", "Mortgage", "Credit Card", "Medical", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDebt({
      ...newDebt,
      [name]: value,
    });
  };

  const validate = () => {
    const { name, total_amount, amount_paid, category } = newDebt;
    const totalAmount = parseFloat(total_amount) || 0;
    const amountPaid = parseFloat(amount_paid) || 0;

    if (!name || !total_amount || !amount_paid || !category) {
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

  const handleSubmit = () => {
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const totalAmount = parseFloat(newDebt.total_amount);
    const amountPaid = parseFloat(newDebt.amount_paid);

    const status =
      amountPaid >= totalAmount
        ? "Paid"
        : amountPaid > 0
        ? "Partially Paid"
        : "Unpaid";

    onCreate({ ...newDebt, status }); // Include calculated status when creating
    setNewDebt({
      name: '',
      total_amount: '',
      amount_paid: '',
      category: '',
    });
    setErrorMessage('');
    onClose();
  };

  const totalAmount = parseFloat(newDebt.total_amount) || 0;
  const amountPaid = parseFloat(newDebt.amount_paid) || 0;

  const status =
    totalAmount && amountPaid
      ? amountPaid >= totalAmount
        ? "Paid"
        : amountPaid > 0
        ? "Partially Paid"
        : "Unpaid"
      : ""; // Blank if either value is not entered

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Debt</Modal.Title>
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
              value={newDebt.name}
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
              value={newDebt.total_amount}
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
              value={newDebt.amount_paid}
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
            <Form.Label className="fw-bold">Status</Form.Label>
            <p
              className={`mb-0 ${
                status === "Paid"
                  ? "text-success"
                  : status === "Partially Paid"
                  ? "text-warning"
                  : status === "Unpaid"
                  ? "text-danger"
                  : ""
              }`}
            >
              <strong>{status || "—"}</strong> {/* Show a dash if blank */}
            </p>
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