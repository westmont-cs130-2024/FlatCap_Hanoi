import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/header.css';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="header-wrapper shadow-sm">
      <header className="header">
        <div className="header-content container d-flex align-items-center justify-content-between">
          <div className="logo">
            <h1 className="hanoi text-dark">Hanoi</h1>
          </div>
          <div className="user-info">
            <span className="username">
              {user ? (
                <NavLink to="/account" className="user-link">
                  {user.first_name} {user.last_name}
                </NavLink>
              ) : (
                'Guest'
              )}
            </span>
          </div>
        </div>
      </header>
      <nav className="secondary-header">
        <div className="container">
          <ul className="secondary-nav-list d-flex justify-content-center gap-3">
            <li>
              <NavLink to="/home" className="secondary-nav-item">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/assets" className="secondary-nav-item">
                Assets
              </NavLink>
            </li>
            <li>
              <NavLink to="/debts" className="secondary-nav-item">
                Debts
              </NavLink>
            </li>
            <li>
              <NavLink to="/documents" className="secondary-nav-item">
                Documents
              </NavLink>
            </li>
            <li>
              <NavLink to="/beneficiaries" className="secondary-nav-item">
                Beneficiaries
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;