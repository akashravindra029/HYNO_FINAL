import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';



const Login = () => {
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password, formData.name);
      navigate('/home'); // Redirect to home/dashboard
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      await socialLogin(provider);
      navigate('/home');
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-split-container">
      {/* Left Side - Login Form */}
      <motion.div
        className="login-left"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="login-card">
          <motion.div
            className="login-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="logo"><FaUser className="logo-icon" /></div>
            <h1>Welcome Back</h1>
          </motion.div>

          <motion.form
            className="login-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                <span className="checkmark"></span> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}
              >
                {error}
              </motion.div>
            )}

            <motion.button type="submit" className="btn btn-primary login-btn" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </motion.form>

          <motion.div className="divider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}><span>or</span></motion.div>

          <motion.div className="social-login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <button className="btn btn-google" onClick={() => handleSocialLogin('Google')}><FaGoogle /> Continue with Google</button>
            <button className="btn btn-facebook" onClick={() => handleSocialLogin('Facebook')}><FaFacebook /> Continue with Facebook</button>
          </motion.div>

          <motion.div className="signup-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
