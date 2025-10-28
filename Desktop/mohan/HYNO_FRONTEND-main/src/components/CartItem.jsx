import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaPrescriptionBottle } from 'react-icons/fa';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="item-image">
        <img src={item.image} alt={item.name} />
        {item.prescription && (
          <div className="prescription-badge">
            <FaPrescriptionBottle />
          </div>
        )}
      </div>

      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">₹{item.price.toFixed(2)} each</p>
        {item.prescription && (
          <p className="prescription-required">Prescription Required</p>
        )}
      </div>

      <div className="item-quantity">
        <motion.button
          className="quantity-btn"
          onClick={() => handleQuantityChange(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={item.quantity <= 1}
        >
          <FaMinus />
        </motion.button>
        <span className="quantity-value">{item.quantity}</span>
        <motion.button
          className="quantity-btn"
          onClick={() => handleQuantityChange(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPlus />
        </motion.button>
      </div>

      <div className="item-total">
        <p className="total-price">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <motion.button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        whileHover={{ scale: 1.1, color: '#e74c3c' }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTrash />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
