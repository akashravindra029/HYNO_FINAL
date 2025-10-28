import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaTruck, FaCheck, FaShieldAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './OrderCheckout.css';

const OrderCheckout = () => {
  const { userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      firstName: userProfile.name.split(' ')[0] || 'John',
      lastName: userProfile.name.split(' ')[1] || 'Doe',
      email: userProfile.email || 'john.doe@example.com',
      phone: userProfile.phone || '+1 (555) 123-4567',
      address: userProfile.address || '123 Main St, City, State 12345',
      city: 'City',
      state: 'State',
      zipCode: '12345',
      country: 'USA'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Mock cart data
    setCartItems([
      { id: 1, name: 'Paracetamol 500mg', price: 5.99, quantity: 2, image: 'https://via.placeholder.com/100x100' },
      { id: 2, name: 'Ibuprofen 200mg', price: 7.49, quantity: 1, image: 'https://via.placeholder.com/100x100' }
    ]);
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 9.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success step
      // Navigate to payments page after successful order
      setTimeout(() => {
        window.location.href = '/payments';
      }, 2000);
    }, 3000);
  };

  const renderShippingForm = () => (
    <motion.div
      className="checkout-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h3>Shipping Information</h3>
      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={formData.shipping.firstName}
            onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={formData.shipping.lastName}
            onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.shipping.email}
          onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={formData.shipping.phone}
          onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={formData.shipping.address}
          onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
          placeholder="Street address"
          required
        />
        <button
          type="button"
          className="btn btn-link"
          onClick={() => window.location.href = '/user'}
          style={{ marginTop: '10px', fontSize: '14px' }}
        >
          Edit Profile Information
        </button>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={formData.shipping.city}
            onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={formData.shipping.state}
            onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            value={formData.shipping.zipCode}
            onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
            required
          />
        </div>
      </div>
    </motion.div>
  );

  const renderPaymentForm = () => (
    <motion.div
      className="checkout-form"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h3>Payment Information</h3>

      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.payment.method === 'card'}
            onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
          />
          <FaCreditCard /> Credit/Debit Card
        </label>
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={formData.payment.method === 'paypal'}
            onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
          />
          <span>🅿️</span> PayPal
        </label>
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.payment.method === 'cod'}
            onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
          />
          <FaMoneyBillWave /> Cash on Delivery
        </label>
      </div>

      {formData.payment.method === 'card' && (
        <>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              value={formData.payment.nameOnCard}
              onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={formData.payment.cardNumber}
              onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={formData.payment.expiryDate}
                onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={formData.payment.cvv}
                onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                placeholder="123"
                required
              />
            </div>
          </div>
        </>
      )}

      <div className="security-notice">
        <FaShieldAlt />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </motion.div>
  );

  const renderReviewOrder = () => (
    <motion.div
      className="order-review"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h3>Review Your Order</h3>

      <div className="review-section">
        <h4>Shipping Address</h4>
        <p>
          {formData.shipping.firstName} {formData.shipping.lastName}<br />
          {formData.shipping.address}<br />
          {formData.shipping.city}, {formData.shipping.state} {formData.shipping.zipCode}<br />
          {formData.shipping.email}<br />
          {formData.shipping.phone}
        </p>
      </div>

      <div className="review-section">
        <h4>Payment Method</h4>
        <p>
          {formData.payment.method === 'card' ? (
            <>**** **** **** {formData.payment.cardNumber.slice(-4)}</>
          ) : formData.payment.method === 'cod' ? (
            'Cash on Delivery'
          ) : (
            'PayPal'
          )}
        </p>
      </div>

      <div className="review-section">
        <h4>Order Items</h4>
        {cartItems.map(item => (
          <div key={item.id} className="review-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h5>{item.name}</h5>
              <p>Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
            </div>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      className="order-success"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-icon">
        <FaCheck />
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>Your order has been confirmed and will be processed shortly.</p>
      <div className="order-details">
        <p><strong>Order Number:</strong> #ORD-{Date.now()}</p>
        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
      </div>
      <button className="btn btn-primary">Continue Shopping</button>
    </motion.div>
  );

  return (
    <motion.div
      className="checkout-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderShippingForm()}
            {step === 2 && renderPaymentForm()}
            {step === 3 && renderReviewOrder()}
            {step === 4 && renderSuccess()}

            {step < 4 && (
              <div className="form-actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isProcessing}
                >
                  {step === 3 ? (isProcessing ? 'Processing...' : 'Place Order') : 'Continue'}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{calculateTax().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
            <span>{calculateShipping() === 0 ? 'Free' : `₹${calculateShipping().toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="shipping-info">
            <FaTruck />
            <span>Free shipping on orders over ₹50</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCheckout;
