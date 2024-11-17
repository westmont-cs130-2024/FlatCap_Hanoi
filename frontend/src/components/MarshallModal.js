import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MarshallModal({ asset, show, onClose, onSave }) {
    const handleSave = () => {
        onSave({ marshalled: true });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Marshall Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to mark the asset "{asset.name}" as marshalled?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MarshallModal;