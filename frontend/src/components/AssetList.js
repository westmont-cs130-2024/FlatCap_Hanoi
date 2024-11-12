// src/components/AssetList.js
import React, { useState, useEffect } from 'react';
import { getAssets, createAsset, deleteAsset, updateAsset } from '../services/api';
import AssetModal from './AssetModal';
import NewAssetModal from './NewAssetModal';
import Header from './Header';

function AssetList() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
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
  const openEditModal = (asset) => {
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
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
                  onClick={() => openEditModal(asset)}
                >
                  {asset.name}
                </h5>
                <p className="card-text mb-0">{asset.description}</p>
              </div>
              <div className="d-flex flex-wrap">
                <button
                  className="btn btn-secondary mr-2 mb-2"
                  onClick={() => openEditModal(asset)}
                >
                  Inventory
                </button>
                <button
                  className="btn btn-secondary mr-2 mb-2"
                  onClick={() => openEditModal(asset)}
                >
                  Value
                </button>
                <button
                  className="btn btn-secondary mr-2 mb-2"
                  onClick={() => openEditModal(asset)}
                >
                  Marshal
                </button>
                <button
                  className="btn btn-secondary mr-2 mb-2"
                  onClick={() => openEditModal(asset)}
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

      {/* Edit Asset Modal */}
      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

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
    </div>
  );
}

export default AssetList;
