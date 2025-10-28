import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(10);
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code.');
    }
  };

  const subtotal = getCartTotal();
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  return (
    <motion.div
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cart-header">
        <h1><FaShoppingCart /> Shopping Cart</h1>
        <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      {!isAuthenticated ? (
        <motion.div
          className="empty-cart"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Please Login</h2>
          <p>You need to be logged in to view your cart.</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/login'}>Login</button>
        </motion.div>
      ) : cartItems.length === 0 ? (
        <motion.div
          className="empty-cart"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some medicines to get started!</p>
          <button className="btn btn-primary">Continue Shopping</button>
        </motion.div>
      ) : (
        <div className="cart-content">
          <motion.div
            className="cart-items"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CartItem
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="cart-summary"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={applyPromoCode}>
                  Apply
                </button>
              </div>

              <motion.button
                className="btn btn-primary checkout-btn"
                onClick={handleCheckout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCreditCard /> Proceed to Checkout
              </motion.button>

              <div className="cart-notices">
                {cartItems.some(item => item.prescription) && (
                  <div className="notice prescription-notice">
                    <strong>Note:</strong> Some items require a prescription. You'll need to upload it during checkout.
                  </div>
                )}
                <div className="notice shipping-notice">
                  <strong>Free Shipping</strong> on orders over ₹50
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
