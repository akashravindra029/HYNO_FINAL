import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaCheckCircle, FaClock, FaTimesCircle, FaTruck, FaSearch } from 'react-icons/fa';
import { useOrder } from '../contexts/OrderContext';
import ShipmentTracking from '../components/ShipmentTracking';
import { formatPrice } from '../utils/currency';

const Orders = () => {
  const { getOrdersByUser, cancelOrder, getOrderByTrackingNumber } = useOrder();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [trackingId, setTrackingId] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const userOrders = getOrdersByUser(1); // Assume userId: 1
    // Ensure total is a valid number for each order
    const processedOrders = userOrders.map(order => {
      if (typeof order.total !== 'number' || isNaN(order.total)) {
        const calculatedTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { ...order, total: calculatedTotal };
      }
      return order;
    });
    setOrders(processedOrders);
  }, [getOrdersByUser, refreshKey]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'processing':
        return <FaClock className="text-yellow-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-blue-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      cancelOrder(orderToCancel);
      setOrders(orders.map(order =>
        order.id === orderToCancel ? { ...order, status: 'Cancelled' } : order
      ));
      setShowCancelConfirm(false);
      setOrderToCancel(null);
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTracking(true);
  };

  const handleRefreshOrders = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchByTrackingId = () => {
    if (!trackingId.trim()) {
      setSearchError('Please enter a tracking ID');
      return;
    }
    const order = getOrderByTrackingNumber(trackingId.trim());
    if (order) {
      setSelectedOrder(order);
      setShowTracking(true);
      setSearchError('');
    } else {
      setSearchError('Order not found with this tracking ID');
    }
  };

  return (
    <main className="pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearchByTrackingId}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2"
              >
                <FaSearch className="text-xs" />
                <span>Search</span>
              </button>
            </div>
            <button
              onClick={handleRefreshOrders}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Refresh Orders
            </button>
          </div>
        </div>
        {searchError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {searchError}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FaBox className="mx-auto text-gray-400 text-6xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500">Your order history will appear here once you place an order.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                    <p className="text-gray-600">{order.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://via.placeholder.com/60x60?text=${item.name.split(' ')[0]}`}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
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
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium text-gray-800">{order.paymentMethod || 'Cash on Delivery'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Prescription</p>
                      <p className="font-medium text-gray-800">
                        {order.prescription ? (
                          <span className="text-green-600">✓ {order.prescription}</span>
                        ) : (
                          <span className="text-gray-500">Not required</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Order Total</p>
                      <p className="text-lg font-bold text-gray-800">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleTrackOrder(order)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaTruck className="text-xs" />
                      <span>Track Order</span>
                    </button>
                    {(order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'processing') && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        Cancel Order
                      </button>
                    )}
                    {(order.status.toLowerCase() === 'cancelled' || order.status.toLowerCase() === 'rejected') && (
                      <span className="text-red-600 font-medium">Order {order.status.toLowerCase() === 'rejected' ? 'Rejected' : 'Cancelled'}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Shipment Tracking Modal */}
        {showTracking && selectedOrder && (
          <ShipmentTracking
            orderId={selectedOrder.id}
            onClose={() => {
              setShowTracking(false);
              setSelectedOrder(null);
            }}
          />
        )}

        {/* Cancel Order Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancel Order</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setOrderToCancel(null);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium"
                >
                  Keep Order
                </button>
                <button
                  onClick={confirmCancelOrder}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
