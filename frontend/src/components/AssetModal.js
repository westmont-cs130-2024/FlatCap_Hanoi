import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AssetModal({ asset, onClose, onSave, onDelete }) {
  const [editedAsset, setEditedAsset] = useState({
    name: asset.name,
    category: asset.category,
    acquisition_date: asset.acquisition_date,
    location: asset.location,
    description: asset.description,
  });

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
    // Validation: Ensure required fields are filled
    if (!editedAsset.name || !editedAsset.category || !editedAsset.acquisition_date || !editedAsset.location) {
      alert("All fields marked with * are required.");
      return;
    }

    onSave(editedAsset);
    onClose();
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this asset?");
    if (confirmed) {
      onDelete(asset.id);
      onClose();
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Asset - {asset.name}</Modal.Title>
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
              value={editedAsset.name}
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
            <Form.Label>
              Acquisition Date <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="acquisition_date"
              value={editedAsset.acquisition_date}
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
              placeholder="Enter description (optional)"
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