// src/components/HomePage.js
import React from 'react';
import Header from './Header'; // Import the new Header component
import '../styles/home.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header /> {/* Use the Header component */}

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: '60%' }}></div>
      </div>

      {/* Upcoming Tasks Section */}
      <div className="upcoming-tasks task-container">
        <h2>Upcoming Tasks</h2>
        <div className="upcoming-task-button">Open an estate bank account <span className="task-date">7/12/25</span></div>
        <div className="upcoming-task-button">Pay debts and taxes <span className="task-date">7/12/25</span></div>
        <div className="upcoming-task-button">File final tax returns <span className="task-date">7/12/25</span></div>
        <div className="upcoming-task-button">Distribute assets to beneficiaries <span className="task-date">7/12/25</span></div>
      </div>

      {/* Recently Completed Section */}
      <div className="recently-completed task-container">
        <h2>Recently Completed</h2>
        <div className="completed-task-button">Obtain death certificate copies <span className="completion-date">Completed 7/12/25</span></div>
        <div className="completed-task-button">Notify beneficiaries and creditors <span className="completion-date">Completed 7/12/25</span></div>
        <div className="completed-task-button">Create an estate inventory <span className="completion-date">Completed 7/12/25</span></div>
        <div className="completed-task-button">Locate the will (if any) <span className="completion-date">Completed 7/12/25</span></div>
        <div className="completed-task-button">Get appointed as executor/administrator <span className="completion-date">Completed 7/12/25</span></div>
      </div>
    </div>
  );
}

export default HomePage;
