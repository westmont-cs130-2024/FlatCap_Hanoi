// src/components/AssetModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AssetModal({ asset, onClose, onSave, onDelete }) {
  // State for the asset fields, initialized to the values of the current asset
  const [editedAsset, setEditedAsset] = useState({
    name: asset.name,
    category: asset.category,
    acquisition_date: asset.acquisition_date,
    location: asset.location,
    description: asset.description,
  });

  // Define the allowed categories for the dropdown
  const allowedCategories = [
    "Real Estate", 
    "Vehicles", 
    "Financial Accounts", 
    "Personal Items", 
    "Other"
  ];

  const handleChange = (e) => {
    setEditedAsset({
      ...editedAsset,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(editedAsset); // Trigger save with updated asset details
    onClose();
  };

  const handleDelete = () => {
    onDelete(asset.id); // Trigger delete for the asset
    onClose();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Asset - {asset.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Asset Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedAsset.name}
              onChange={handleChange}
              placeholder="Enter asset name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={editedAsset.category}
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
            <Form.Label>Acquisition Date</Form.Label>
            <Form.Control
              type="date"
              name="acquisition_date"
              value={editedAsset.acquisition_date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={editedAsset.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={editedAsset.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
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

export default AssetModal;
