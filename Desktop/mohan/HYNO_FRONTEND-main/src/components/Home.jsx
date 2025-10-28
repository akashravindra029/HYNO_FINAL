import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPills, FaUserMd, FaClock, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Advertisement from './Advertisement';
import './Home.css';

const Home = () => {
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [showAd, setShowAd] = useState(false);

  const featuredMedicines = [
    { id: 1, name: 'Paracetamol', price: 5.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Ibuprofen', price: 7.49, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Aspirin', price: 4.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Vitamin C', price: 12.99, image: 'https://via.placeholder.com/150' },
  ];

  const services = [
    { icon: FaPills, title: 'Wide Range of Medicines', description: 'Over 10,000 medicines available' },
    { icon: FaUserMd, title: 'Expert Pharmacists', description: 'Professional consultation available' },
    { icon: FaClock, title: '24/7 Service', description: 'Round the clock delivery' },
    { icon: FaStar, title: 'Quality Assured', description: 'FDA approved medicines only' },
  ];

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    showSuccess(`${medicine.name} added to cart successfully!`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    showSuccess('Thank you for subscribing to our newsletter!');
    e.target.reset();
    // Show advertisement after newsletter signup
    setShowAd(true);
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Welcome to Hyno Pharma</h1>
          <p>Your trusted online pharmacy for all your health needs</p>
          <Link to="/products">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="grid grid-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <service.icon className="service-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="grid grid-4">
          {featuredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              className="card product-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={medicine.image} alt={medicine.name} />
              <h3>{medicine.name}</h3>
              <p className="price">₹{medicine.price}</p>
              <motion.button
                className="btn btn-primary"
                onClick={() => handleAddToCart(medicine)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="grid grid-4">
          <div className="stat">
            <h3>10,000+</h3>
            <p>Medicines Available</p>
          </div>
          <div className="stat">
            <h3>50,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>24/7</h3>
            <p>Customer Support</p>
          </div>
          <div className="stat">
            <h3>99%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        className="newsletter"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="card">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for health tips and exclusive offers</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </motion.section>

      {/* Advertisement Modal */}
      <Advertisement
        isOpen={showAd}
        onClose={() => setShowAd(false)}
      />
    </motion.div>
  );
};

export default Home;
