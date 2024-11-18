import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getBeneficiaries, addBeneficiariesToAsset } from '../services/api';

function AdministerModal({ asset, show, onClose, onSave }) {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await getBeneficiaries();
                setBeneficiaries(response.data);
                // Pre-select existing beneficiaries if any
                if (asset.beneficiaries) {
                    setSelectedBeneficiaries(asset.beneficiaries.map(b => b.id));
                }
            } catch (ex) {
                console.error('Error fetching beneficiaries:', ex);
                setError('Failed to load beneficiaries');
            }
        };
        if (show) {
            fetchBeneficiaries();
        }
    }, [show, asset.beneficiaries]);

    const handleSave = async () => {
        setLoading(true);
        setError('');
        try {
            console.log('Sending beneficiaries:', selectedBeneficiaries); // Debug log
            const response = await addBeneficiariesToAsset(asset.id, selectedBeneficiaries);
            console.log('Server response:', response.data); // Debug log

            if (response.data.asset) {
                onSave({
                    ...asset,
                    ...response.data.asset,
                    administered: true
                });
                onClose();
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data); // Detailed error logging
            setError(error.response?.data?.error || 'Failed to save beneficiaries');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions,
            option => parseInt(option.value, 10));
        setSelectedBeneficiaries(selectedOptions);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Administer Asset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Who are you administering "{asset.name}" to?</p>
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
                <select
                    multiple
                    value={selectedBeneficiaries}
                    onChange={handleChange}
                    className="form-control"
                    size={Math.min(beneficiaries.length, 5)}
                >
                    {beneficiaries.map((beneficiary) => (
                        <option key={beneficiary.id} value={beneficiary.id}>
                            {beneficiary.first_name} {beneficiary.last_name} - {beneficiary.email}
                        </option>
                    ))}
                </select>
                <small className="form-text text-muted mt-2">
                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple beneficiaries
                </small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={loading || selectedBeneficiaries.length === 0}
                >
                    {loading ? 'Saving...' : 'Confirm'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdministerModal;