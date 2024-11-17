// src/components/AssetList.js
import React, { useState, useEffect } from 'react';
import { getAssets, createAsset, deleteAsset, updateAsset } from '../services/api';
import AssetModal from './AssetModal';
import NewAssetModal from './NewAssetModal';
import ValueModal from './ValueModal';
import MarshallModal from './MarshallModal';
import AdministerModal from './AdministerModal';
import Header from './Header';

function AssetList() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [modalType, setModalType] = useState(null); // Tracks which modal to show
  const [showNewAssetModal, setShowNewAssetModal] = useState(false);

  // Fetch assets from the API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await getAssets();
        setAssets(response.data);
      } catch(ex) {
        console.log("Error occurred: ", ex.status, ex.response);
      }
    };
    fetchAssets();
  }, []);

  // Open edit modal for an asset
    // Open a specific modal for an asset
    const openModal = (asset, type) => {
        setSelectedAsset(asset);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedAsset(null);
        setModalType(null);
    };

  // Save changes to an asset
  const handleSave = async (updatedAsset) => {
    await updateAsset(selectedAsset.id, updatedAsset); // API call to update asset
    const response = await getAssets(); // Refresh asset list
    setAssets(response.data);
    closeModal();
  };

  // Delete an asset
  const handleDelete = async (assetId) => {
    await deleteAsset(assetId);
    setAssets(assets.filter((a) => a.id !== assetId)); // Update state after deletion
  };

  return (
    
    <div className="container">
      <Header />
      <h1 className="display-4 mb-4">Assets</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowNewAssetModal(true)}
      >
        Add New Asset
      </button>

      <div>
        {assets.map((asset) => (
          <div className="card mb-4" key={asset.id}>
            <div className="card-header">
              <small className="text-muted">{asset.category}</small>
            </div>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className="card-title mb-0"
                  style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => openModal(asset, 'Inventory')}
                >
                  {asset.name}
                </h5>
                <p className="card-text mb-0">{asset.description}</p>
              </div>
              <div className="d-flex flex-wrap">
                <button
                  className={`btn ${asset.inventoried ? 'btn-primary' : 'btn-secondary'} mr-2 mb-2`}
                  onClick={() => openModal(asset, 'Inventory')}
                >
                  Inventory
                </button>
                <button
                  className={`btn ${asset.valued ? 'btn-primary' : 'btn-secondary'} mr-2 mb-2`}
                  onClick={() => openModal(asset, 'Value')}
                >
                  Value
                </button>
                <button
                  className={`btn ${asset.marshalled ? 'btn-primary' : 'btn-secondary'} mr-2 mb-2`}
                  onClick={() => openModal(asset, 'Marshall')}
                >
                  Marshal
                </button>
                <button
                  className={`btn ${asset.administered ? 'btn-primary' : 'btn-secondary'} mr-2 mb-2`}
                  onClick={() => openModal(asset, 'Administer')}
                >
                  Administer
                </button>
                <button
                  className="btn btn-danger ml-2 mb-2"
                  onClick={() => handleDelete(asset.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* New Asset Modal */}
      <NewAssetModal
          show={showNewAssetModal}
          onClose={() => setShowNewAssetModal(false)}
          onCreate={async (newAsset) => {
              await createAsset(newAsset);
              const response = await getAssets();
              setAssets(response.data);
          }}
      />

      {/* Edit Asset Modal */}
      {modalType === 'Inventory' && selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {/* Value Modal */}
      {modalType === 'Value' && selectedAsset && (
        <ValueModal
          asset={selectedAsset}
          show={modalType === 'Value'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Marshall Modal */}
      {modalType === 'Marshall' && selectedAsset && (
        <MarshallModal
          asset={selectedAsset}
          show={modalType === 'Marshall'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Administer Modal */}
      {modalType === 'Administer' && selectedAsset && (
        <AdministerModal
          asset={selectedAsset}
          show={modalType === 'Administer'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

    </div>
  );
}

export default AssetList;
