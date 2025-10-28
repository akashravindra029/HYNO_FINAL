import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/hyno pharma logo.jpg" alt="Hyno Pharmacy Logo" className="logo-image" />
          </Link>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medicines..."
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="header-right">
          <Link to="/user" className="header-link">
            <FaUser />
            <span>{isAuthenticated && user ? `Welcome, ${user.name}` : 'Account'}</span>
          </Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="header-link logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}
          <Link to="/cart" className="header-link">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
