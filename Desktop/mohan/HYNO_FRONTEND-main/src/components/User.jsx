import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaSave, FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './User.css';

const User = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(userProfile);

  const [editData, setEditData] = useState(userData);

  useEffect(() => {
    setUserData(userProfile);
    setEditData(userProfile);
  }, [userProfile]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(userData);
  };

  const handleSave = () => {
    updateProfile(editData);
    setUserData(editData);
    setIsEditing(false);
    // In real app, this would save to backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      className="user-profile"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <motion.div
          className="profile-avatar"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FaUser />
        </motion.div>
        <div className="profile-info">
          <h1>{userData.name}</h1>
          <p>Member since 2023</p>
        </div>
        {!isEditing && (
          <motion.button
            className="btn btn-primary edit-btn"
            onClick={handleEdit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> Edit Profile
          </motion.button>
        )}
      </div>

      <div className="profile-content">
        <motion.div
          className="profile-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label><FaEnvelope /> Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </div>

            <div className="info-item">
              <label><FaPhone /> Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            <div className="info-item">
              <label><FaMapMarkerAlt /> Address</label>
              {isEditing ? (
                <textarea
                  value={editData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows="3"
                />
              ) : (
                <p>{userData.address}</p>
              )}
            </div>

            <div className="info-item">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              ) : (
                <p>{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>

            <div className="info-item">
              <label>Gender</label>
              {isEditing ? (
                <select
                  value={editData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="profile-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Medical Information</h2>
          <div className="info-grid">
            <div className="info-item full-width">
              <label>Medical History</label>
              {isEditing ? (
                <textarea
                  value={editData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  rows="4"
                  placeholder="List any medical conditions, allergies, or important health information..."
                />
              ) : (
                <p>{userData.medicalHistory}</p>
              )}
            </div>

            <div className="info-item full-width">
              <label>Emergency Contact</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Name - Phone Number"
                />
              ) : (
                <p>{userData.emergencyContact}</p>
              )}
            </div>
          </div>
        </motion.div>

        {isEditing && (
          <motion.div
            className="edit-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="btn btn-primary" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              <FaTimes /> Cancel
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        className="account-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Account Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>12</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h3>8</h3>
            <p>Active Prescriptions</p>
          </div>
          <div className="stat-card">
            <h3>₹245.67</h3>
            <p>Total Spent</p>
          </div>
          <div className="stat-card">
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default User;
