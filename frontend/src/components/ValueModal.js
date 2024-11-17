import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ValueModal({ asset, show, onClose, onSave }) {
    const [value, setValue] = useState(asset.value || '');

    const handleSave = () => {
        if (value && parseInt(value) >= 0) {
            onSave({ valued: true, value: parseInt(value) });
            onClose();
        } else {
            alert('Please enter a valid value.');
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Value Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Asset Value</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter asset value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Value
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ValueModal;