import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaTruck, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';
import { useOrder } from '../contexts/OrderContext';
import { formatPrice } from '../utils/currency';

const ShipmentTracking = ({ orderId, onClose }) => {
  const { getOrderById } = useOrder();
  const [order, setOrder] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    const orderData = getOrderById(orderId);
    if (orderData) {
      setOrder(orderData);
      // Calculate estimated delivery (3-5 days from order date)
      const orderDate = new Date(orderData.orderDate);
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 3) + 3);
      setEstimatedDelivery(deliveryDate.toLocaleDateString());
    }
  }, [orderId, getOrderById]);

  // Refresh order data when component mounts or orderId changes
  useEffect(() => {
    const refreshOrder = () => {
      const orderData = getOrderById(orderId);
      if (orderData) {
        setOrder(orderData);
      }
    };

    refreshOrder();
    // Set up interval to refresh order data every 5 seconds
    const interval = setInterval(refreshOrder, 5000);

    return () => clearInterval(interval);
  }, [orderId, getOrderById]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <FaBoxOpen className="text-blue-500" />;
      case 'processing':
        return <FaClock className="text-yellow-500" />;
      case 'shipped':
        return <FaTruck className="text-orange-500" />;
      case 'out for delivery':
        return <FaMapMarkerAlt className="text-purple-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return 'border-blue-500 bg-blue-50';
      case 'processing':
        return 'border-yellow-500 bg-yellow-50';
      case 'shipped':
        return 'border-orange-500 bg-orange-50';
      case 'out for delivery':
        return 'border-purple-500 bg-purple-50';
      case 'delivered':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };



  if (!order) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <p className="text-center text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shipment Tracking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">Order #{order.id}</span>
              <span className="text-sm text-gray-600">Tracking: {order.trackingNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estimated Delivery: {estimatedDelivery}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {order.shipmentStatus.map((statusUpdate, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(statusUpdate.status)}`}>
                  {getStatusIcon(statusUpdate.status)}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{statusUpdate.status}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(statusUpdate.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{statusUpdate.description}</p>
              </div>
            </motion.div>
          ))}
        </div>



        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Product Details</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://via.placeholder.com/50x50?text=${item.name.split(' ')[0]}`}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-600">Subtotal: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-gray-800">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Delivery Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Shipping Address</p>
                <p className="font-medium text-gray-800">{order.shippingAddress?.name}</p>
                <p className="text-gray-600 text-sm">
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium text-gray-800">{order.shippingAddress?.phone}</p>
                <p className="text-gray-600 text-sm">Delivery updates will be sent here</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShipmentTracking;
