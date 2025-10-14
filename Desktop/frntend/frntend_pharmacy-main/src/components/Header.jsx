import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "../styles/Header.css";

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src="/images/hyno pharma.jpg" alt="HynoPharma" />
      </Link>
      <nav>
        <Link to="/"><button>🏠 Home</button></Link>
        <Link to="/prescription"><button>📄 Prescription</button></Link>
        <Link to="/medicines"><button>💊 Medicines</button></Link>
        <Link to="/lab-tests"><button>🧪 Lab Tests</button></Link>
        <Link to="/consultation"><button>👨‍⚕️ Consultation</button></Link>
        <Link to="/payment-offers"><button>💳 Payment Offers</button></Link>
        <Link to="/about-us"><button>ℹ️ About Us</button></Link>
        <Link to="/faqs"><button>❓ FAQs</button></Link>
      </nav>
      <div className="header-actions">
        <Link to="/cart" className="cart-link">
          <button className="cart-btn">
            🛒 Cart
            {getTotalItems() > 0 && (
              <span className="cart-count">{getTotalItems()}</span>
            )}
          </button>
        </Link>
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user?.name || 'User'}</span>
              <Link to="/profile"><button className="profile-btn">Profile</button></Link>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login"><button className="login-btn">Login</button></Link>
              <Link to="/register"><button className="register-btn">Register</button></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
