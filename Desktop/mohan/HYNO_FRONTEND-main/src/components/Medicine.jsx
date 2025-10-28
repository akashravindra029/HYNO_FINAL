import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle, FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import './Medicine.css';

const Medicine = ({ medicine, onAddToCart, onToggleWishlist }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!medicine) {
    return <div className="medicine-card">Medicine data not available</div>;
  }

  const handleAddToCart = () => {
    onAddToCart(medicine);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(medicine.id);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'star filled' : 'star'}
      />
    ));
  };

  return (
    <motion.div
      className="medicine-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="medicine-image">
        <img src={medicine.image || 'https://via.placeholder.com/300x300?text=No+Image'} alt={medicine.name} />
        {medicine.prescriptionRequired && (
          <div className="prescription-badge">Rx Required</div>
        )}
        {medicine.discount > 0 && (
          <div className="discount-badge">-{medicine.discount}%</div>
        )}
      </div>

      <div className="medicine-info">
        <h3 className="medicine-name">{medicine.name}</h3>
        <p className="medicine-brand">{medicine.brand}</p>

        <div className="medicine-rating">
          <div className="stars">
            {renderStars(medicine.rating)}
          </div>
          <span className="rating-text">({medicine.reviews} reviews)</span>
        </div>

        <div className="medicine-price">
          <span className="current-price">₹{medicine.price.toFixed(2)}</span>
          {medicine.originalPrice && (
            <span className="original-price">₹{medicine.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="medicine-description">
          {isExpanded ? medicine.description : `${medicine.description.substring(0, 100)}...`}
          <button
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </p>

        <div className="medicine-details">
          <div className="detail-item">
            <strong>Dosage:</strong> {medicine.dosage}
          </div>
          <div className="detail-item">
            <strong>Form:</strong> {medicine.form}
          </div>
          <div className="detail-item">
            <strong>Quantity:</strong> {medicine.quantity}
          </div>
        </div>

        <div className="medicine-stock">
          {medicine.inStock ? (
            <span className="in-stock">In Stock</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
      </div>

      <div className="medicine-actions">
        <motion.button
          className="btn btn-secondary wishlist-btn"
          onClick={handleToggleWishlist}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeart /> {medicine.isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </motion.button>

        <motion.button
          className={`btn btn-primary add-to-cart-btn ${!medicine.inStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!medicine.inStock}
          whileHover={{ scale: medicine.inStock ? 1.05 : 1 }}
          whileTap={{ scale: medicine.inStock ? 0.95 : 1 }}
        >
          <FaShoppingCart /> {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      </div>

      <motion.div
        className="medicine-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <button className="quick-view-btn">
          <FaInfoCircle /> Quick View
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Medicine;
