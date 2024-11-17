import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MarshallModal({ asset, show, onClose, onSave }) {
    const [didSell, setDidSell] = useState(false); // State for the checkbox
    const handleSave = () => {
        const updatedFields = { marshalled: true };
        if (didSell) {
            updatedFields.category = "Financial Accounts"; // Update category if sold
        }
        onSave(updatedFields); // Send updated fields to the parent component
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Marshall Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Show the "Did you sell this asset?" question only for non-financial accounts */}
                {asset.category !== "Financial Accounts" && (
                    <Form.Group controlId="didSellCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Did you sell this asset?"
                            checked={didSell}
                            onChange={(e) => setDidSell(e.target.checked)}
                        />
                    </Form.Group>
                )}
                <p>Did you Marshal "{asset.name}"?</p>
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