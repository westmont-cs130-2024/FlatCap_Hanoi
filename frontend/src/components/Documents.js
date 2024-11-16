// src/components/Documents.js
import React, { useState, useEffect } from 'react';
import { getDocuments, uploadDocument, deleteDocument } from '../services/api'; // Only the methods you have
import Header from './Header';

function Documents() {
    const [documents, setDocuments] = useState([]); // State to store the list of documents
    const [file, setFile] = useState(null); // State to store the file being uploaded

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
    }, []); // Empty dependency array means this effect runs once on mount

    // Handle file input change
    function handleFileChange(e) {
        setFile(e.target.files[0]); // Update the file state with the selected file
    }

    // Handle file upload
    async function handleFileUpload() {
        if (file) {
            const formData = new FormData();
            formData.append("document[file]", file); // Ensure correct format
            formData.append("document[name]", file.name); // Add a name if needed

            try {
                await uploadDocument(formData); // Call the API to upload the document
                const updatedDocuments = await getDocuments(); // Fetch the updated list of documents
                setDocuments(updatedDocuments.data); // Update state with the new documents list
            } catch (error) {
                console.error("Error uploading document:", error);
            }
        }
    }

    async function handleDelete(id) {
        try {
            await deleteDocument(id); // Call the API to delete the document
            setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id)); // Remove the deleted document from the list
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    // Render the document list
    return (
        <div>
            <Header />
            <h1>Documents</h1>

            {/* Upload section */}
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload PDF</button>

            {/* Display list of documents */}
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id}>
                        <div className="document-item">
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                {doc.name}
                            </a>
                            <button onClick={() => handleDelete(doc.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Documents;