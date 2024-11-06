// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import your UserContext
import '../styles/header.css'; // Optional: Add specific styles for the header component

function Header() {
  const { user } = useContext(UserContext); // Access user data from context

  return (
    <div className="header-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="hanoi">hanoi</div> {/* Logo text */}
        </div>
        <div className="user-info">
          {/* Display logged-in user's name */}
          <div className="username">
            {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <div className="secondary-header">
        <nav className="secondary-nav">
          <ul className="secondary-nav-list">
            <li><Link to="/home" className="secondary-nav-item">Home</Link></li>
            <li><Link to="/assets" className="secondary-nav-item">Assets</Link></li>
            <li><a href="/debts" className="secondary-nav-item">Debts</a></li>
            <li><a href="#" className="secondary-nav-item">Documents</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
