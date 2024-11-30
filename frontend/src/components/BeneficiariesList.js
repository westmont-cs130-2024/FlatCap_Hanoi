import React, { useState, useEffect } from 'react';
import { getBeneficiaries, createBeneficiary, updateBeneficiary, deleteBeneficiary } from '../services/api';
import NewBeneficiaryModal from './NewBeneficiaryModal';
import EditBeneficiaryModal from './EditBeneficiaryModal';
import Header from './Header';
import HelpButton from './HelpButton';
import BeneficiaryValueDistribution from './BeneficiaryValueDistribution';

function BeneficiaryList() {
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [refreshDistributionGraph, setRefreshDistributionGraph] = useState(0);

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await getBeneficiaries();
                setBeneficiaries(response.data);
            } catch (error) {
                console.error('Error fetching beneficiaries:', error);
            }
        };
        fetchBeneficiaries();
    }, []);

    const handleCreateBeneficiary = async (newBeneficiary) => {
        try {
            const response = await createBeneficiary(newBeneficiary);
            setBeneficiaries([...beneficiaries, response.data]);

            // Trigger graph refresh
            setRefreshDistributionGraph(prev => prev + 1);

            setShowNewBeneficiaryModal(false);
        } catch (error) {
            console.error('Error creating beneficiary:', error);
        }
    };

    const handleUpdateBeneficiary = async (id, updatedBeneficiary) => {
        try {
            const response = await updateBeneficiary(id, updatedBeneficiary);
            setBeneficiaries(beneficiaries.map((beneficiary) =>
                beneficiary.id === id ? response.data : beneficiary
            ));

            // Trigger graph refresh
            setRefreshDistributionGraph(prev => prev + 1);

            setSelectedBeneficiary(null);
        } catch (error) {
            console.error('Error updating beneficiary:', error);
        }
    };

    const handleDeleteBeneficiary = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this beneficiary?");
        if (confirmed) {
            try {
                await deleteBeneficiary(id);
                setBeneficiaries(beneficiaries.filter((beneficiary) => beneficiary.id !== id));

                // Trigger graph refresh
                setRefreshDistributionGraph(prev => prev + 1);

            } catch (error) {
                console.error('Error deleting beneficiary:', error);
            }
        }
    };

    const openEditBeneficiaryModal = (beneficiary) => {
        setSelectedBeneficiary(beneficiary);
    };

    return (
        <div className="container mt-5">
            <Header />

            {/* Page Title */}
            <div className="text-center mb-4">
                <h1 className="display-4">Manage Beneficiaries</h1>
                <p className="text-muted">Keep track of your beneficiaries and their assigned assets.</p>
                <HelpButton section="beneficiaries" />
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setShowNewBeneficiaryModal(true)}
                >
                    Add New Beneficiary
                </button>
            </div>

            {/* Beneficiary Value Distribution Graph */}
            <BeneficiaryValueDistribution refreshTrigger={refreshDistributionGraph} />


            {/* Beneficiary List */}
            <div className="bg-light p-4 rounded shadow">
                <h5 className="text-primary mb-4">Beneficiary List</h5>
                {beneficiaries.length === 0 ? (
                    <div className="alert alert-info text-center" role="alert">
                        No beneficiaries found. Add a new beneficiary to get started.
                    </div>
                ) : (
                    <ul className="list-group">
                        {beneficiaries.map((beneficiary) => (
                            <li
                                key={beneficiary.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <h5
                                        className="mb-1"
                                        style={{ cursor: 'pointer', color: 'black' }}
                                        onClick={() => openEditBeneficiaryModal(beneficiary)}
                                    >
                                        {beneficiary.first_name} {beneficiary.last_name}
                                    </h5>
                                    <p className="mb-1 text-muted">{beneficiary.email}</p>
                                    {beneficiary.notes && <p className="mb-0">{beneficiary.notes}</p>}
                                    {beneficiary.assets && beneficiary.assets.length > 0 && (
                                        <small className="text-muted">
                                            Assigned assets: {beneficiary.assets.map(asset => asset.name).join(', ')}
                                        </small>
                                    )}
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => openEditBeneficiaryModal(beneficiary)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
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
                    onClose={() => setSelectedBeneficiary(null)}
                    onSave={handleUpdateBeneficiary}
                />
            )}
        </div>
    );
}

export default BeneficiaryList;