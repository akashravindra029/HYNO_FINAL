import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { saveUser, getUsers, saveUsers } from '../utils/localStorage';
import { users as mockUsers } from '../data/mockData';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check against mock users first
    const existingUsers = getUsers() || mockUsers;
    const user = existingUsers.find(u => u.email === loginData.email);

    if (user && user.password === loginData.password) {
      saveUser(user);
      onClose();
      navigate('/');
      window.location.reload(); // Refresh to update navbar
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const existingUsers = getUsers() || mockUsers;
    const userExists = existingUsers.find(u => u.email === signupData.email);

    if (userExists) {
      setError('User with this email already exists');
      return;
    }

    // Create new user
    const newUser = {
      id: Math.max(...existingUsers.map(u => u.id)) + 1,
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      phone: '',
      address: '',
      dob: '',
      gender: '',
    };

    const updatedUsers = [...existingUsers, newUser];
    saveUsers(updatedUsers);
    saveUser(newUser);

    setSuccess('Account created successfully! Redirecting to home...');

    setTimeout(() => {
      onClose();
      navigate('/');
      window.location.reload(); // Refresh to update navbar
    }, 1500);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-8 w-full max-w-md mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>

            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 px-4 text-center ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4 text-right">
                  <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">Forgot Password?</a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Login
                </button>
              </form>
            )}

            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="signup-confirm-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Sign Up
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
