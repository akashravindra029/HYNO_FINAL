import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit } from 'react-icons/fa';
import { getCurrentUser, saveUser, getUsers, saveUsers } from '../utils/localStorage';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setProfile(currentUser);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save updated profile to localStorage
    saveUser(profile);
    // Update the user in the users list
    const users = getUsers() || [];
    const updatedUsers = users.map(user => user.id === profile.id ? profile : user);
    saveUsers(updatedUsers);
    console.log('Profile updated:', profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <main className="pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-3" />
              My Profile
            </h1>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email ID</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.dob}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              {isEditing ? (
                <select
                  value={profile.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-800 py-2">{profile.gender}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={profile.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-800 py-2">{profile.address}</p>
              )}
            </div>
          </motion.div>

          {isEditing && (
            <motion.div
              className="flex space-x-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
