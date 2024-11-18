import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function NewBeneficiaryModal({ show, onClose, onCreate }) {
    const [beneficiary, setBeneficiary] = useState({
        first_name: '',
        last_name: '',
        email: '',
        notes: '',
    });

    const handleChange = (e) => {
        setBeneficiary({
            ...beneficiary,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onCreate(beneficiary);
        setBeneficiary({
            first_name: '',
            last_name: '',
            email: '',
            notes: '',
        });
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Beneficiary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={beneficiary.first_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={beneficiary.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={beneficiary.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="notes"
                            value={beneficiary.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewBeneficiaryModal;