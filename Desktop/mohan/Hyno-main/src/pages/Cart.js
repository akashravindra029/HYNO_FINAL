import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus, FaTrash, FaUpload, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOffer } from '../contexts/OfferContext';
import { formatPrice, convertToINR } from '../utils/currency';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { appliedOffer, applyOffer, calculateDiscount, clearAppliedOffer } = useOffer();
  const [prescription, setPrescription] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescription(file);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const subtotal = getTotalPrice();
    const result = applyOffer(couponCode, subtotal);
    if (result.success) {
      setCouponError('');
      setCouponCode('');
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    clearAppliedOffer();
    setCouponError('');
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = getTotalPrice();
  const discount = calculateDiscount(appliedOffer, subtotal);
  const shipping = subtotal > convertToINR(50) ? 0 : convertToINR(5.99);
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart to get started.</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Browse Products
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary and Prescription Upload */}
          <div className="space-y-6">
            {/* Prescription Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Prescription</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="prescription-upload"
                />
                <label
                  htmlFor="prescription-upload"
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  Click to upload prescription
                </label>
                {prescription && (
                  <p className="text-sm text-gray-600 mt-2">{prescription.name}</p>
                )}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <FaTag className="text-gray-600" />
                <span className="font-medium text-gray-800">Have a coupon?</span>
              </div>
              {appliedOffer ? (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                  <div>
                    <p className="font-medium text-green-800">{appliedOffer.code}</p>
                    <p className="text-sm text-green-600">{appliedOffer.description}</p>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedOffer?.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium mt-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
