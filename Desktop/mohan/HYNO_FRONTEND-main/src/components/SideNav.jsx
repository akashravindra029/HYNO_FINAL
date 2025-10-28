import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaClipboardList,
  FaCreditCard,
  FaFileMedical,
  FaPills,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaAd,
  FaTags,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './SideNav.css';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openDropdown, setOpenDropdown] = useState(true);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close the side nav after logout
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    {
      label: 'Menu',
      icon: FaBars,
      subItems: [
        { path: '/home', icon: FaHome, label: 'Home' },
        { path: '/user', icon: FaUser, label: 'User Profile' },
        { path: '/medicine', icon: FaPills, label: 'Medicines' },
        { path: '/cart', icon: FaShoppingCart, label: 'Cart' },
        { path: '/payments', icon: FaCreditCard, label: 'Payments' },
        { path: '/products', icon: FaShoppingCart, label: 'Products' },
        { path: '/orders', icon: FaClipboardList, label: 'Orders' },
        { path: '/prescriptions', icon: FaFileMedical, label: 'Prescriptions' },
        { path: '/login', icon: isAuthenticated ? FaSignOutAlt : FaSignInAlt, label: isAuthenticated ? 'Logout' : 'Login', action: isAuthenticated ? handleLogout : null },
        { path: '/admin', icon: FaUserShield, label: 'Admin' },
        { path: '/admin-login', icon: FaUserShield, label: 'Admin Login' },
        { path: '/checkout', icon: FaCreditCard, label: 'Checkout' },
        { path: '/advertisement', icon: FaAd, label: 'Ads' },
        { path: '/category', icon: FaTags, label: 'Categories' },
        { path: '/about', icon: FaInfoCircle, label: 'About' },
      ]
    }
  ];

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className={`mobile-menu-btn ${isOpen ? 'hidden' : ''}`}
        onClick={toggleNav}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidenav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleNav}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`sidenav ${isOpen ? 'open' : ''}`}
        initial={isMobile ? { x: -300 } : { x: 0 }}
        animate={isMobile ? { x: isOpen ? 0 : -300 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ul className="sidenav-menu">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="sidenav-link dropdown-toggle"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <Icon className="sidenav-icon" />
                  {openDropdown ? <FaChevronUp className="dropdown-icon" /> : <FaChevronDown className="dropdown-icon" />}
                </div>
                <AnimatePresence>
                  {openDropdown && (
                    <motion.ul
                      className="dropdown-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.subItems.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon;
                        const isActive = location.pathname === subItem.path;

                        return (
                          <motion.li
                            key={subItem.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            {subItem.action ? (
                              <button
                                onClick={subItem.action}
                                className={`sidenav-link sub-link ${isActive ? 'active' : ''}`}
                              >
                                <SubIcon className="sidenav-icon" />
                                <span className="sidenav-label">{subItem.label}</span>
                              </button>
                            ) : (
                              <Link
                                to={subItem.path}
                                className={`sidenav-link sub-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                              >
                                <SubIcon className="sidenav-icon" />
                                <span className="sidenav-label">{subItem.label}</span>
                              </Link>
                            )}
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>

        <motion.div
          className="sidenav-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
        </motion.div>
      </motion.nav>
    </>
  );
};

export default SideNav;
