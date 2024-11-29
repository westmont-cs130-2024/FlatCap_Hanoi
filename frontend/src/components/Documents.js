import React, { useState, useEffect } from 'react';
import { getDocuments, uploadDocument, deleteDocument } from '../services/api';
import Header from './Header';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch documents when the component mounts
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments(); // Fetch all documents from the API
        setDocuments(response.data); // Update state with fetched documents
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  // Handle file input change
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  // Handle file upload
  async function handleFileUpload() {
    if (file) {
      const formData = new FormData();
      formData.append("document[file]", file);
      formData.append("document[name]", file.name);

      try {
        await uploadDocument(formData);
        const updatedDocuments = await getDocuments();
        setDocuments(updatedDocuments.data); // Update state with the new documents list
        setFile(null); // Clear the file input after upload
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this document?");
    if (confirmed) {
      try {
        await deleteDocument(id); // Call the API to delete the document
        setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  }

  return (
    <div className="container mt-5">
      <Header />

      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="display-4">Manage Documents</h1>
        <p className="text-muted">Upload, view, and manage your documents here.</p>
      </div>

      {/* Upload Section */}
      <div className="bg-light p-4 rounded shadow mb-4">
        <h5 className="text-primary">Upload New Document</h5>
        <div className="d-flex align-items-center gap-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="form-control"
          />
          <button
            onClick={handleFileUpload}
            className="btn btn-primary"
            disabled={!file}
          >
            Upload
          </button>
        </div>
        {file && (
          <p className="mt-2 text-success">
            Selected File: <strong>{file.name}</strong>
          </p>
        )}
      </div>

      {/* Document List */}
      <div className="bg-light p-4 rounded shadow">
        <h5 className="text-primary mb-4">Document List</h5>
        {documents.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            No documents found. Upload a document to get started.
          </div>
        ) : (
          <ul className="list-group">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none"
                >
                  {doc.name}
                </a>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(doc.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Documents;