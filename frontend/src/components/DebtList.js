// src/components/DebtList.js
import React, { useState, useEffect } from 'react';
import { getDebts, createDebt, deleteDebt, updateDebt } from '../services/api';
import DebtModal from './DebtModal';
import NewDebtModal from './NewDebtModal';
import Header from './Header';

function DebtList() {
  const [debts, setDebts] = useState([]);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [showNewDebtModal, setShowNewDebtModal] = useState(false);

  // Fetch debts from the API
  useEffect(() => {
    const fetchDebts = async () => {
      const response = await getDebts();
      setDebts(response.data);
    };
    fetchDebts();
  }, []);

  // Open edit modal for a debt
  const openEditModal = (debt) => {
    setSelectedDebt(debt);
  };

  const closeModal = () => {
    setSelectedDebt(null);
  };

  // Save changes to a debt
  const handleSave = async (updatedDebt) => {
    await updateDebt(selectedDebt.id, updatedDebt); // API call to update debt
    const response = await getDebts(); // Refresh debt list
    setDebts(response.data);
    closeModal();
  };

  // Delete a debt
  const handleDelete = async (debtId) => {
    await deleteDebt(debtId);
    setDebts(debts.filter((d) => d.id !== debtId)); // Update state after deletion
  };

  return (
    <div className="container">
      <Header />
      <h1 className="display-4 mb-4">Debts</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowNewDebtModal(true)}
      >
        Add New Debt
      </button>

      <div>
        {debts.map((debt) => (
          <div className="card mb-4" key={debt.id}>
            <div className="card-header">
              <small className="text-muted">{debt.category}</small>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className="card-title mb-0"
                  style={{textDecoration: 'underline', cursor: 'pointer'}}
                  onClick={() => openEditModal(debt)}
                >
                  {debt.name}
                </h5>
                <p className="card-text mb-0">Outstanding: ${debt.total_amount != null && debt.amount_paid != null
                  ? debt.total_amount - debt.amount_paid
                  : ''}
                </p>
                <p className="card-text mb-0">Paid: ${debt.amount_paid}</p>
                <p className="card-text mb-0">Total: ${debt.total_amount}</p>
                <p className="card-text mb-0">Status: {debt.status}</p>
              </div>
              <div className="d-flex flex-wrap">
              <button
                  className="btn btn-secondary mr-2 mb-2"
                  onClick={() => openEditModal(debt)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2 mb-2"
                  onClick={() => handleDelete(debt.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Debt Modal */}
      {selectedDebt && (
        <DebtModal
          debt={selectedDebt}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {/* New Debt Modal */}
      <NewDebtModal
        show={showNewDebtModal}
        onClose={() => setShowNewDebtModal(false)}
        onCreate={async (newDebt) => {
          await createDebt(newDebt);
          const response = await getDebts();
          setDebts(response.data);
        }}
      />
    </div>
  );
}

export default DebtList;
