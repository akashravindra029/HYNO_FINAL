import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>HynoPharmacy</h3>
          <p>Your trusted online pharmacy for quality medicines and healthcare products. We ensure safe and reliable delivery to your doorstep.</p>
          <div className="social-links">
            <button className="social-link" aria-label="Facebook" onClick={() => window.open('https://www.facebook.com', '_blank')}><FaFacebook /></button>
            <button className="social-link" aria-label="Twitter" onClick={() => window.open('https://www.twitter.com', '_blank')}><FaTwitter /></button>
            <button className="social-link" aria-label="Instagram" onClick={() => window.open('https://www.instagram.com', '_blank')}><FaInstagram /></button>
            <button className="social-link" aria-label="LinkedIn" onClick={() => window.open('https://www.linkedin.com', '_blank')}><FaLinkedin /></button>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/prescriptions">Prescriptions</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone />
              <span>+91 12345 67890</span>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <span>support@hynopharmacy.com</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>123 Health Street, Medical City, India</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 HynoPharmacy. All rights reserved.</p>
          <div className="footer-links">
            <button className="footer-link" onClick={() => window.open('https://example.com/privacy-policy', '_blank')}>Privacy Policy</button>
            <button className="footer-link" onClick={() => window.open('https://example.com/terms-of-service', '_blank')}>Terms of Service</button>
            <button className="footer-link" onClick={() => window.open('https://example.com/refund-policy', '_blank')}>Refund Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
