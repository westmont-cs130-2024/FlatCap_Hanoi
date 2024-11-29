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
  const [sortedAssets, setSortedAssets] = useState({});
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showNewAssetModal, setShowNewAssetModal] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await getAssets();
      const assets = response.data;

      // Sort assets by category
      const categorizedAssets = assets.reduce((categories, asset) => {
        const category = asset.category || 'Uncategorized';
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(asset);
        return categories;
      }, {});

      setAssets(assets);
      setSortedAssets(categorizedAssets);
    };
    fetchAssets();
  }, []);

  const openModal = (asset, type) => {
    setSelectedAsset(asset);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedAsset(null);
    setModalType(null);
  };

  const handleSave = async (updatedAsset) => {
    await updateAsset(selectedAsset.id, updatedAsset);
    const response = await getAssets();
    const categorizedAssets = response.data.reduce((categories, asset) => {
      const category = asset.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(asset);
      return categories;
    }, {});

    setAssets(response.data);
    setSortedAssets(categorizedAssets);
    closeModal();
  };

  const handleDelete = async (assetId) => {
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (confirmed) {
      await deleteAsset(assetId);
      const updatedAssets = assets.filter((a) => a.id !== assetId);
      const categorizedAssets = updatedAssets.reduce((categories, asset) => {
        const category = asset.category || 'Uncategorized';
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(asset);
        return categories;
      }, {});

      setAssets(updatedAssets);
      setSortedAssets(categorizedAssets);
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <div className="text-center mb-4">
        <h1 className="display-4">Manage Assets</h1>
        <p className="text-muted">Track and manage your assets efficiently.</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowNewAssetModal(true)}
        >
          Add New Asset
        </button>
      </div>

      {Object.keys(sortedAssets).length === 0 ? (
        <div className="alert alert-info text-center shadow-sm p-4 bg-light rounded">
          No assets found. Click <strong>Add New Asset</strong> to get started.
        </div>
      ) : (
        Object.entries(sortedAssets).map(([category, assets]) => (
          <div key={category} className="mb-4">
            <div className="p-4 bg-light rounded shadow">
              <h4 className="text-secondary">{category}</h4>
              <ul className="list-group mt-3">
                {assets.map((asset) => (
                  <li
                    key={asset.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5
                        style={{ cursor: 'pointer', color: 'black' }}
                        onClick={() => openModal(asset, 'Inventory')}
                      >
                        {asset.name}
                      </h5>
                      <p className="mb-1 text-muted">
                        <strong>Description:</strong>{' '}
                        {asset.description || 'No description provided'}
                      </p>
                      {asset.valued && (
                        <p className="mb-1 text-success">
                          <strong>Value:</strong> ${asset.value?.toLocaleString() || 'N/A'}
                        </p>
                      )}
                      {asset.administered && asset.beneficiaries?.length > 0 && (
                        <small className="text-muted">
                          Assigned to: {asset.beneficiaries.map((b) => b.first_name).join(', ')}
                        </small>
                      )}
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className={`btn btn-sm ${asset.inventoried ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => openModal(asset, 'Inventory')}
                      >
                        Inventory
                      </button>
                      <button
                        className={`btn btn-sm ${asset.valued ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => openModal(asset, 'Value')}
                      >
                        {asset.valued ? 'Edit Value' : 'Value'}
                      </button>
                      <button
                        className={`btn btn-sm ${asset.marshalled ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => openModal(asset, 'Marshall')}
                      >
                        Marshal
                      </button>
                      <button
                        className={`btn btn-sm ${asset.administered ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => openModal(asset, 'Administer')}
                      >
                        Administer
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(asset.id)}
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

      {modalType === 'Inventory' && selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}

      {modalType === 'Value' && selectedAsset && (
        <ValueModal
          asset={selectedAsset}
          show={modalType === 'Value'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {modalType === 'Marshall' && selectedAsset && (
        <MarshallModal
          asset={selectedAsset}
          show={modalType === 'Marshall'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {modalType === 'Administer' && selectedAsset && (
        <AdministerModal
          asset={selectedAsset}
          show={modalType === 'Administer'}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      <NewAssetModal
        show={showNewAssetModal}
        onClose={() => setShowNewAssetModal(false)}
        onCreate={async (newAsset) => {
          await createAsset(newAsset);
          const response = await getAssets();
          const categorizedAssets = response.data.reduce((categories, asset) => {
            const category = asset.category || 'Uncategorized';
            if (!categories[category]) {
              categories[category] = [];
            }
            categories[category].push(asset);
            return categories;
          }, {});

          setAssets(response.data);
          setSortedAssets(categorizedAssets);
        }}
      />
    </div>
  );
}

export default AssetList;