import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/faq.css'; // Custom CSS for styling the page
import { FaTimes } from 'react-icons/fa'; // Icon for the close button

const FAQPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const section = location.hash.slice(1); // Extract the section from the URL hash

  useEffect(() => {
    // Scroll to the appropriate section if the hash exists
    if (section) {
      const targetElement = document.getElementById(section);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [section]);

  // Function to navigate back to the home page if redirected from the sign-in page
  const handleClose = () => {
    if (location.state?.fromSignIn) {
      navigate('/home');
    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  // Function to navigate to specific pages
  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="container mt-5 faq-page position-relative">
      {/* Close Button */}
      <button
        className="close-button position-absolute top-0 end-0 m-3 btn btn-link text-danger"
        onClick={handleClose}
      >
        <FaTimes size={24} />
      </button>

      <h1 className="display-4 text-center mb-5">Getting Started / FAQ</h1>

      {/* Overview Section */}
      <section id="overview" className="mb-5">
        <h2 className="text-primary">Overview</h2>
        <p>
          Welcome to the Hanoi Estate Settlement App! This app is designed to guide you through the 
          process of settling the estate of a deceased loved one. We know this can be an incredibly
          difficult time and are here to help in any way we can. By keeping track of 
          <strong> assets</strong>, <strong>debts</strong>, <strong>documents</strong>, and 
          <strong> beneficiaries</strong>, you can ensure that no step is overlooked.
        </p>
        <p>
          Whether you're a first-time executor or an experienced administrator, this guide will 
          walk you through each feature of the app and explain how to use it effectively.
        </p>
      </section>

      {/* Assets Section */}
      <section id="assets" className="mb-5">
        <h2
          className="text-primary cursor-pointer"
          onClick={() => navigateToPage('/assets')}
          style={{ textDecoration: 'underline' }}
        >
          Assets
        </h2>
        <p>
          The <strong>Assets</strong> page allows you to track items of value in the estate, 
          including bank accounts, real estate, vehicles, or personal property.
        </p>
        <h4>Key Features</h4>
        <ul>
          <li>
            <strong>Inventory:</strong> 
            <ul>
              <li>Mark the asset as inventoried once it has been located and identified.</li>
              <li><strong>Validation:</strong> Ensure all assets are inventoried before moving on 
              to other steps.</li>
            </ul>
          </li>
          <li>
            <strong>Value:</strong>
            <ul>
              <li>Assign a monetary value to the asset based on appraisals or market research.</li>
              <li><strong>Validation:</strong> Enter a non-negative numeric value; an error 
              occurs if the field is left blank or contains invalid characters.</li>
            </ul>
          </li>
          <li>
            <strong>Marshal:</strong> 
            <ul>
              <li>Acquire the asset into your personal possession (e.g., moving funds 
              into an estate bank account or acquire the paperwork for property).</li>
              <li><strong>Tip:</strong> Ensure that assets are valued before marshaling them.</li>
            </ul>
          </li>
          <li>
            <strong>Administer:</strong>
            <ul>
              <li>Distribute the asset to the appropriate beneficiary according to the will or 
              estate plan.</li>
              <li><strong>Validation:</strong> Ensure that all assets are marshaled before 
              administration.</li>
            </ul>
          </li>
          <li>
            <strong>Delete:</strong> Remove an asset if it was added by mistake. Note that deleted 
            assets cannot be recovered.
          </li>
        </ul>
      </section>

      {/* Debts Section */}
      <section id="debts" className="mb-5">
        <h2
          className="text-primary cursor-pointer"
          onClick={() => navigateToPage('/debts')}
          style={{ textDecoration: 'underline' }}
        >
          Debts
        </h2>
        <p>
          The <strong>Debts</strong> page tracks liabilities such as loans, credit card balances, 
          or unpaid medical bills.
        </p>
        <h4>Key Features</h4>
        <ul>
          <li>
            <strong>Status:</strong> 
            <ul>
              <li>Track the progress of debts as <em>Unpaid</em>, <em>Partially Paid</em>, or 
              <em>Paid</em>.</li>
            </ul>
          </li>
          <li>
            <strong>Edit:</strong>
            <ul>
              <li>Update debt details, such as adjusting the amount paid or correcting a mistake 
              in the total amount owed.</li>
              <li><strong>Validation:</strong> Ensure that the amount paid does not exceed the 
              total amount owed.</li>
            </ul>
          </li>
          <li>
            <strong>Delete:</strong> Remove debts that were added in error.
          </li>
        </ul>
      </section>

      {/* Documents Section */}
      <section id="documents" className="mb-5">
        <h2
          className="text-primary cursor-pointer"
          onClick={() => navigateToPage('/documents')}
          style={{ textDecoration: 'underline' }}
        >
          Documents
        </h2>
        <p>
          The <strong>Documents</strong> page allows you to store and manage essential paperwork, 
          such as wills, financial statements, and death certificates.
        </p>
        <h4>Key Features</h4>
        <ul>
          <li>
            <strong>Upload:</strong> Add files directly to the system for safekeeping and easy 
            access.
          </li>
          <li>
            <strong>View:</strong> Open any uploaded document to review its contents.
          </li>
          <li>
            <strong>Delete:</strong> Remove documents that are no longer needed.
          </li>
          <li><strong>Tip:</strong> Organize your files by naming them clearly and consistently 
          (e.g., "Will_July2025.pdf").</li>
        </ul>
      </section>

      {/* Beneficiaries Section */}
      <section id="beneficiaries" className="mb-5">
        <h2
          className="text-primary cursor-pointer"
          onClick={() => navigateToPage('/beneficiaries')}
          style={{ textDecoration: 'underline' }}
        >
          Beneficiaries
        </h2>
        <p>
          The <strong>Beneficiaries</strong> page helps you manage the individuals or 
          organizations who will inherit assets from the estate.
        </p>
        <h4>Key Features</h4>
        <ul>
          <li>
            <strong>Add New Beneficiary:</strong> Add recipients to the list, including their 
            names and contact information.
          </li>
          <li>
            <strong>Edit:</strong> Update the details of an existing beneficiary if their 
            information changes.
          </li>
          <li>
            <strong>Delete:</strong> Remove a beneficiary from the list if they were added 
            by mistake.
          </li>
          <li>
            <strong>Tip:</strong> Use the Notes field to record specific details about each 
            beneficiary, such as their relationship to the deceased or special instructions.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default FAQPage;