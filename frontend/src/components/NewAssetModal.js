import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function NewAssetModal({ show, onClose, onCreate }) {
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    acquisition_date: '',
    location: '',
    description: '',
  });

  const allowedCategories = [
    "Real Estate", 
    "Vehicles", 
    "Financial Accounts", 
    "Personal Items", 
    "Other"
  ];

  const handleChange = (e) => {
    setNewAsset({
      ...newAsset,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Validation: Ensure required fields are filled
    if (!newAsset.name || !newAsset.category || !newAsset.acquisition_date || !newAsset.location) {
      alert("All fields marked with * are required.");
      return;
    }

    onCreate({
      ...newAsset,
      inventoried: true,
      valued: false,
      marshalled: false,
      administered: false,
      value: 0,
    });

    setNewAsset({
      name: '',
      category: '',
      acquisition_date: '',
      location: '',
      description: '',
    });

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Asset Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newAsset.name}
              onChange={handleChange}
              placeholder="Enter asset name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Category <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newAsset.category}
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
            <Form.Label>
              Acquisition Date <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="acquisition_date"
              value={newAsset.acquisition_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Location <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={newAsset.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newAsset.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Asset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewAssetModal;