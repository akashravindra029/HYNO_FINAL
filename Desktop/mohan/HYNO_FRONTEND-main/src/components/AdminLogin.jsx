import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Admin login successful! (This is a demo)');
    }, 2000);
  };

  return (
    <motion.div
      className="admin-login-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-login-card">
        <motion.div
          className="admin-login-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="admin-logo">
            <FaUserShield className="admin-logo-icon" />
          </div>
          <h1>Admin Portal</h1>
          <p>Access the administration dashboard</p>
        </motion.div>

        <motion.form
          className="admin-login-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-group">
            <label htmlFor="username">Admin Username</label>
            <div className="input-group">
              <FaUserShield className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn btn-admin-login"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
          </motion.button>
        </motion.form>

        <motion.div
          className="admin-security-notice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FaShieldAlt className="security-icon" />
          <p>This portal is restricted to authorized administrators only. All activities are monitored and logged.</p>
        </motion.div>

        <motion.div
          className="back-to-user"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/login">← Back to User Login</Link>
        </motion.div>
      </div>

      <motion.div
        className="admin-features"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Admin Capabilities</h2>
        <div className="features-list">
          <div className="feature">
            <div className="feature-icon">👥</div>
            <h3>User Management</h3>
            <p>Manage user accounts and permissions</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📦</div>
            <h3>Order Oversight</h3>
            <p>Monitor and manage all orders</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💊</div>
            <h3>Inventory Control</h3>
            <p>Manage medicine stock and pricing</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>View detailed business analytics</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
