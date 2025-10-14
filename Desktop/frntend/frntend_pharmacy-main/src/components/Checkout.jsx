import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!shippingInfo.name || !shippingInfo.street || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip || !shippingInfo.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      items: cart,
      shippingInfo,
      shippingMethod,
      total: getTotalPrice(),
      date: new Date().toISOString()
    };

    // Save order to localStorage (in a real app, this would be sent to backend)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]') || [];
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    // Show confirmation
    alert('Order placed successfully! Your order will be shipped soon.');

    // Navigate to order history
    navigate('/order-history');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/medicines')} className="shop-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container fade-in">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.brand} • {item.strength} • {item.packSize}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-price">
                  ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <p>Total: ${getTotalPrice()}</p>
          </div>
        </div>

        <form className="shipping-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address *</label>
            <input
              type="text"
              id="street"
              name="street"
              value={shippingInfo.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP Code *</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="shipping-method">
            <h3>Shipping Method</h3>
            <div className="method-options">
              <label>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                Standard Shipping (Free)
              </label>
              <label>
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                Express Shipping ($9.99)
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
