import React, { useState, useEffect } from 'react';
import {getDebts, createDebt, deleteDebt, updateDebt, getTotalLiabilities} from '../services/api';
import DebtModal from './DebtModal';
import NewDebtModal from './NewDebtModal';
import Header from './Header';
import HelpButton from './HelpButton';
import axios from "axios";

function DebtList() {
  const [debts, setDebts] = useState([]);
  const [groupedDebts, setGroupedDebts] = useState({ Unpaid: [], "Partially Paid": [], Paid: [] });
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [showNewDebtModal, setShowNewDebtModal] = useState(false);
  const [totalLiabilities, setTotalLiabilities] = useState(null);
  const [error, setError] = useState('');

  const fetchTotalLiabilities = async () => {
    try {
      const response = await getTotalLiabilities();
      console.log(response);
      setTotalLiabilities(response.data.total_liabilities);
      setError('');
    } catch (err) {
      setError('Failed to fetch total liabilities.');
      console.error(err);
    }
  };

  const fetchDebts = async () => {
    const response = await getDebts();
    const allDebts = response.data;

    const grouped = {
      Unpaid: allDebts.filter((debt) => debt.status === "Unpaid"),
      "Partially Paid": allDebts.filter((debt) => debt.status === "Partially Paid"),
      Paid: allDebts.filter((debt) => debt.status === "Paid"),
    };

    setDebts(allDebts);
    setGroupedDebts(grouped);
  };

  useEffect(() => {
    fetchDebts();
    fetchTotalLiabilities();
  }, []);


  const openEditModal = (debt) => {
    setSelectedDebt(debt);
  };

  const closeModal = () => {
    setSelectedDebt(null);
  };

  const handleSave = async (updatedDebt) => {
    await updateDebt(selectedDebt.id, updatedDebt);
    const response = await getDebts();
    const allDebts = response.data;

    const grouped = {
      Unpaid: allDebts.filter((debt) => debt.status === "Unpaid"),
      "Partially Paid": allDebts.filter((debt) => debt.status === "Partially Paid"),
      Paid: allDebts.filter((debt) => debt.status === "Paid"),
    };


    setDebts(allDebts);
    setGroupedDebts(grouped);
    closeModal();

    await fetchTotalLiabilities();
  };

  const handleDelete = async (debtId) => {
    const confirmed = window.confirm('Are you sure you want to delete this debt?');
    if (confirmed) {
      await deleteDebt(debtId);
      const updatedDebts = debts.filter((d) => d.id !== debtId);

      const grouped = {
        Unpaid: updatedDebts.filter((debt) => debt.status === "Unpaid"),
        "Partially Paid": updatedDebts.filter((debt) => debt.status === "Partially Paid"),
        Paid: updatedDebts.filter((debt) => debt.status === "Paid"),
      };

      setDebts(updatedDebts);
      setGroupedDebts(grouped);

      await fetchTotalLiabilities();
    }
  };

  // const handleCreateDebt = async (newDebt) => {
  //   await createDebt(newDebt); // Call the API to create the debt
  //   await fetchDebts(); // Refresh the debts list
  //   await fetchTotalLiabilities(); // Refresh the total liabilities after creating debt
  // };

  return (
    <div className="container mt-5">
      <Header />
      <div className="text-center mb-4">
        <h1 className="display-4">Manage Debts</h1>
        <p className="text-muted">Track and manage your debts efficiently.</p>
        <HelpButton section="debts" />

        {/* Add New Debt Button */}
        <button
          className="btn btn-primary btn-lg mb-3"
          onClick={() => setShowNewDebtModal(true)}
        >
          Add New Debt
        </button>

        {/* Total Liabilities Display */}
        <div className="mt-3">
          <p className="text-dark">
            Total Sum of Liabilities: ${totalLiabilities !== null ? totalLiabilities.toFixed(2) : '0.00'}
          </p>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>

      {/* Debts List Rendering */}
      {debts.length === 0 ? (
        <div className="alert alert-info text-center shadow-sm p-4 bg-light rounded">
          No debts found. Click <strong>Add New Debt</strong> to get started.
        </div>
      ) : (
        Object.entries(groupedDebts).map(([status, debts]) => (
          <div key={status} className="mb-4">
            <div className="p-4 bg-light rounded shadow">
              <h4
                className={`text-${
                  status === "Paid"
                    ? "success"
                    : status === "Partially Paid"
                      ? "warning"
                      : "danger"
                }`}
              >
                {status}
              </h4>
              <ul className="list-group mt-3">
                {debts.map((debt) => (
                  <li
                    key={debt.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5
                        style={{ cursor: 'pointer', color: 'black' }}
                        onClick={() => openEditModal(debt)}
                      >
                        {debt.name}
                      </h5>
                      <p className="mb-1">
                        <strong>Outstanding:</strong> $
                        {debt.total_amount != null && debt.amount_paid != null
                          ? debt.total_amount - debt.amount_paid
                          : 'N/A'}
                      </p>
                      <p className="mb-1">
                        <strong>Paid:</strong> $
                        {debt.amount_paid === 0
                          ? "0"
                          : debt.amount_paid != null
                            ? debt.amount_paid
                            : "N/A"}
                      </p>
                      <p className="mb-1">
                        <strong>Total:</strong> ${debt.total_amount || "N/A"}
                      </p>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => openEditModal(debt)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(debt.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}

      <NewDebtModal
        show={showNewDebtModal}
        onClose={() => setShowNewDebtModal(false)}
        onCreate={async (newDebt) => {
          await createDebt(newDebt);
          const response = await getDebts();
          const allDebts = response.data;

          const grouped = {
            Unpaid: allDebts.filter((debt) => debt.status === "Unpaid"),
            "Partially Paid": allDebts.filter((debt) => debt.status === "Partially Paid"),
            Paid: allDebts.filter((debt) => debt.status === "Paid"),
          };

          setDebts(allDebts);
          setGroupedDebts(grouped);

          await fetchTotalLiabilities();
        }}
      />

      {selectedDebt && (
        <DebtModal
          debt={selectedDebt}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );


}

export default DebtList;
