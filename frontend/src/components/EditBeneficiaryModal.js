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
    }, [beneficiary]);

    const handleChange = (e) => {
        setEditedBeneficiary({
            ...editedBeneficiary,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        if (!editedBeneficiary.first_name || !editedBeneficiary.last_name || !editedBeneficiary.email) {
            alert("First Name, Last Name, and Email are required.");
            return;
        }

        onSave(beneficiary.id, editedBeneficiary);
        onClose();
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Beneficiary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={editedBeneficiary.first_name}
                            onChange={handleChange}
                            placeholder="Enter first name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={editedBeneficiary.last_name}
                            onChange={handleChange}
                            placeholder="Enter last name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
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
                            placeholder="Enter any notes (optional)"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBeneficiaryModal;