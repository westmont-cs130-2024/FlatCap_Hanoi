import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function AdministerModal({ asset, show, onClose, onSave }) {
    const handleSave = () => {
        onSave({ administered: true });
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Administer Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to administer the asset "{asset.name}"?</p>
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

export default AdministerModal;