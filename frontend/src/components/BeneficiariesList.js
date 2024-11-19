import React, { useState, useEffect } from 'react';
import { getBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary } from '../services/api';
import NewBeneficiaryModal from './NewBeneficiaryModal';
import EditBeneficiaryModal from './EditBeneficiaryModal'; // Import the new EditBeneficiaryModal
import Header from './Header';

function BeneficiaryList() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null); // State for the selected beneficiary

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await getBeneficiaries();
                setBeneficiaries(response.data);
            } catch (ex) {
                console.error('Error fetching beneficiaries:', ex);
            }
        };
        fetchBeneficiaries();
    }, []);

    const handleCreateBeneficiary = async (newBeneficiary) => {
        try {
            const response = await createBeneficiary(newBeneficiary);
            setBeneficiaries([...beneficiaries, response.data]);
            setShowNewBeneficiaryModal(false);
        } catch (ex) {
            console.error('Error creating beneficiary:', ex);
        }
    };

    const handleUpdateBeneficiary = async (id, updatedBeneficiary) => {
        try {
            const response = await updateBeneficiary(id, updatedBeneficiary);
            setBeneficiaries(beneficiaries.map((beneficiary) =>
                beneficiary.id === id ? response.data : beneficiary
            ));
            setSelectedBeneficiary(null); // Close the modal after saving by resetting the selected beneficiary
        } catch (ex) {
            console.error('Error updating beneficiary:', ex);
        }
    };

    const handleDeleteBeneficiary = async (id) => {
        try {
            await deleteBeneficiary(id);
            setBeneficiaries(beneficiaries.filter((beneficiary) => beneficiary.id !== id));
        } catch (ex) {
            console.error('Error deleting beneficiary:', ex);
        }
    };

    const openEditBeneficiaryModal = (beneficiary) => {
        setSelectedBeneficiary(beneficiary);
    };

    return (
        <div className="container">
            <Header />
            <h1 className="display-4 mb-4">Beneficiaries</h1>

            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowNewBeneficiaryModal(true)}
            >
                Add New Beneficiary
            </button>

            <div>
                {beneficiaries.map((beneficiary) => (
                    <div className="card mb-4" key={beneficiary.id}>
                        <div className="card-header bg-light">
                            <small className="text-muted">{beneficiary.email}</small>
                        </div>
                        <div className="card-body d-flex justify-content-between">
                            <div>
                                <h5 className="card-title mb-1" style={{ cursor: 'pointer' }}>
                                    {beneficiary.first_name} {beneficiary.last_name}
                                </h5>
                                <p className="card-text mb-0">{beneficiary.notes}</p>
                                {/* Add this new section to display assigned assets */}
                                {beneficiary.assets && beneficiary.assets.length > 0 && (
                                    <p className="card-text mb-0" style={{ color: 'blue' }}>
                                        Assigned assets: {' '}
                                        {beneficiary.assets.map((asset) => (
                                            <span key={asset.id}>
                                                {asset.name}
                                                {beneficiary.assets.indexOf(asset) !== beneficiary.assets.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <button
                                    className="btn btn-secondary mb-2"
                                    onClick={() => openEditBeneficiaryModal(beneficiary)} // Open Edit Modal on click
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Beneficiary Modal */}
            <NewBeneficiaryModal
                show={showNewBeneficiaryModal}
                onClose={() => setShowNewBeneficiaryModal(false)}
                onCreate={handleCreateBeneficiary}
            />

            {/* Edit Beneficiary Modal */}
            {selectedBeneficiary && (
                <EditBeneficiaryModal
                    beneficiary={selectedBeneficiary}
                    onClose={() => setSelectedBeneficiary(null)} // Close modal by setting selectedBeneficiary to null
                    onSave={handleUpdateBeneficiary}
                />
            )}
        </div>
    );
}

export default BeneficiaryList;
