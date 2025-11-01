import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaShieldAlt, FaAward, FaCertificate, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Trust Badges Section */}
      <div className="bg-primary-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <FaShieldAlt className="w-8 h-8 text-secondary-400" />
              <div>
                <h4 className="font-semibold text-white">100% Genuine</h4>
                <p className="text-sm text-primary-200">Authentic medicines guaranteed</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaAward className="w-8 h-8 text-secondary-400" />
              <div>
                <h4 className="font-semibold text-white">Quality Assured</h4>
                <p className="text-sm text-primary-200">ISO certified pharmacy</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaCertificate className="w-8 h-8 text-secondary-400" />
              <div>
                <h4 className="font-semibold text-white">Licensed Pharmacy</h4>
                <p className="text-sm text-primary-200">Government approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">HyNo Pharmacy</h3>
              <p className="text-primary-200 mb-4">
                Your trusted partner for health and wellness. We provide quality medicines and healthcare products with fast delivery across the country.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Offers & Discounts
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Track Orders
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-primary-200 hover:text-white transition-colors duration-300">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=Medicines" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Medicines
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Healthcare" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Healthcare Products
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Personal Care" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Personal Care
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Baby Care" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Baby Care
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Nutrition" className="text-primary-200 hover:text-white transition-colors duration-300">
                    Nutrition & Supplements
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-secondary-400 mt-1 flex-shrink-0" />
                  <div className="text-primary-200">
                    <p>123 Pharmacy Street</p>
                    <p>City, State 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                  <p className="text-primary-200">(123) 456-7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                  <p className="text-primary-200">info@hynopharmacy.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-primary-300 text-sm mb-4 md:mb-0">
              &copy; 2024 HyNo Pharmacy. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                Refund Policy
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors duration-300">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
