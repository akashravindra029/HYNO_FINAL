import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt, FaTag, FaFilePrescription } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useOffer } from '../contexts/OfferContext';
import { getProducts, saveProducts } from '../utils/localStorage';
import { products } from '../data/mockData';
import PrescriptionUpload from '../components/PrescriptionUpload';
import { formatPrice, convertToINR } from '../utils/currency';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { appliedOffer, applyOffer, calculateDiscount, clearAppliedOffer, incrementOfferUsage } = useOffer();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [uploadedPrescriptions, setUploadedPrescriptions] = useState([]);

  const subtotal = getTotalPrice();
  const discount = calculateDiscount(appliedOffer, subtotal);
  const shipping = subtotal > convertToINR(50) ? 0 : convertToINR(5.99);
  const total = subtotal - discount + shipping;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

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

  const handlePlaceOrder = () => {
    // Update inventory
    const currentProducts = getProducts() || products;
    const updatedProducts = currentProducts.map(product => {
      const cartItem = items.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    });
    saveProducts(updatedProducts);

    // Create new order
    const newOrder = {
      userId: 1, // Assume default user
      userName: shippingInfo.name,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      total: total,
      paymentMethod: paymentMethod,
      shippingAddress: shippingInfo,
      appliedOffer: appliedOffer,
      prescription: uploadedPrescriptions.length > 0 ? uploadedPrescriptions[0].name : null,
    };

    // Add order using context
    const orderId = addOrder(newOrder);

    // Increment offer usage if applied
    if (appliedOffer) {
      incrementOfferUsage(appliedOffer.id);
      clearAppliedOffer();
    }

    // Clear cart and navigate
    clearCart();
    navigate('/orders');
  };

  const steps = [
    { id: 1, title: 'Shipping' },
    { id: 2, title: 'Payment' },
    { id: 3, title: 'Review' },
  ];

  if (items.length === 0) {
    return (
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id}
              </div>
              <span className={`ml-2 ${step.id <= currentStep ? 'text-blue-600' : 'text-gray-600'}`}>
                {step.title}
              </span>
              {step.id < steps.length && (
                <div className={`w-16 h-1 mx-4 ${step.id < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            {currentStep === 1 && (
              <motion.form
                onSubmit={handleShippingSubmit}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                    <input
                      type="text"
                      value={shippingInfo.pincode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium mt-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {currentStep === 2 && (
              <motion.form
                onSubmit={handlePaymentSubmit}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <FaCreditCard className="mr-2" />
                        Debit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <FaMobileAlt className="mr-2" />
                        UPI
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex items-center justify-center p-4 border rounded-lg ${
                          paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <FaMoneyBillWave className="mr-2" />
                        Cash on Delivery
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
                        <input
                          type="text"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                        <input
                          type="text"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    Review Order
                  </button>
                </div>
              </motion.form>
            )}

            {currentStep === 3 && (
              <motion.div
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Review Your Order</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Shipping Information</h3>
                    <p className="text-gray-600">{shippingInfo.name}</p>
                    <p className="text-gray-600">{shippingInfo.address}</p>
                    <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.pincode}</p>
                    <p className="text-gray-600">{shippingInfo.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Payment Method</h3>
                    <p className="text-gray-600">
                      {paymentMethod === 'card' && 'Debit Card'}
                      {paymentMethod === 'upi' && 'UPI'}
                      {paymentMethod === 'cod' && 'Cash on Delivery'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg text-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

            {/* Prescription Upload Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FaFilePrescription className="text-blue-600" />
                  <span className="font-medium text-gray-800">Prescription Required?</span>
                </div>
                <button
                  onClick={() => setShowPrescriptionUpload(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  Upload Prescription
                </button>
              </div>
              {uploadedPrescriptions.length > 0 && (
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-sm text-green-600 font-medium">✓ Prescription uploaded: {uploadedPrescriptions[0].name}</p>
                </div>
              )}
            </div>

            {/* Coupon Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
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

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              <hr />
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
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Upload Modal */}
      {showPrescriptionUpload && (
        <PrescriptionUpload
          onUpload={(files) => {
            setUploadedPrescriptions(files);
            setShowPrescriptionUpload(false);
          }}
          onClose={() => setShowPrescriptionUpload(false)}
          existingPrescriptions={[]} // Can be populated from user history later
        />
      )}
    </main>
  );
};

export default Checkout;
