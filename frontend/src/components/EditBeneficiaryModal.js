import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EditBeneficiaryModal({ beneficiary, onClose, onSave }) {
    const [editedBeneficiary, setEditedBeneficiary] = useState({
        first_name: beneficiary.first_name,
        last_name: beneficiary.last_name,
        email: beneficiary.email,
        notes: beneficiary.notes,
    });

    useEffect(() => {
        setEditedBeneficiary({
            first_name: beneficiary.first_name,
            last_name: beneficiary.last_name,
            email: beneficiary.email,
            notes: beneficiary.notes,
        });
    }, [beneficiary]); // Reset the state when the beneficiary prop changes

    const handleChange = (e) => {
        setEditedBeneficiary({
            ...editedBeneficiary,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        onSave(beneficiary.id, editedBeneficiary); // Trigger save with updated beneficiary details
        onClose(); // Close modal after saving
    };

    return (
        <Modal show={true} onHide={onClose}> {/* Ensure 'onHide' triggers closing */}
            <Modal.Header closeButton>
                <Modal.Title>Edit Beneficiary - {beneficiary.first_name} {beneficiary.last_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={editedBeneficiary.first_name}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={editedBeneficiary.last_name}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editedBeneficiary.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="notes"
                            value={editedBeneficiary.notes}
                            onChange={handleChange}
                            placeholder="Enter any notes"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}> {/* Close modal on close button */}
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBeneficiaryModal;