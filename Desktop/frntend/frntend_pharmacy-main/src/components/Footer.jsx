import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HynoPharma</h3>
          <p>Your trusted online pharmacy for all your health needs. Quality medicines, fast delivery, and expert advice.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaYoutube />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><strong>Phone:</strong> 9666989458</p>
          <p><strong>Email:</strong> info@hynopharmacy.com</p>
          <p><strong>Address:</strong> Near Kadugodi Tree Park, Prashanth Extension, Whitefield, Bangalore-560066</p>
          <p><strong>Hours:</strong> Mon-Sun: 9AM-9PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 HynoPharmacy | All rights reserved. | Powered by HynoPharma</p>
      </div>
    </footer>
  );
}

export default Footer;
