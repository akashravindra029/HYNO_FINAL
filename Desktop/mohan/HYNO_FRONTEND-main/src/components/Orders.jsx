import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaTruck, FaCheckCircle, FaTimesCircle, FaEye, FaRedo, FaBan } from 'react-icons/fa';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Mock data - in real app, this would come from an API
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 45.99,
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 5.99 },
          { name: 'Vitamin C 1000mg', quantity: 1, price: 15.99 },
          { name: 'Ibuprofen 200mg', quantity: 1, price: 7.49 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-01-12',
        status: 'shipped',
        total: 23.49,
        items: [
          { name: 'Cetirizine 10mg', quantity: 1, price: 8.49 },
          { name: 'Aspirin 75mg', quantity: 2, price: 4.99 }
        ]
      },
      {
        id: 'ORD-003',
        date: '2024-01-10',
        status: 'processing',
        total: 67.98,
        items: [
          { name: 'Multivitamin Tablets', quantity: 1, price: 18.99 },
          { name: 'Omeprazole 20mg', quantity: 3, price: 9.99 }
        ]
      },
      {
        id: 'ORD-004',
        date: '2024-01-08',
        status: 'cancelled',
        total: 12.99,
        items: [
          { name: 'Amoxicillin 500mg', quantity: 1, price: 12.99 }
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle className="status-icon delivered" />;
      case 'shipped': return <FaTruck className="status-icon shipped" />;
      case 'processing': return <FaShoppingBag className="status-icon processing" />;
      case 'cancelled': return <FaTimesCircle className="status-icon cancelled" />;
      default: return <FaShoppingBag className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const reorder = (orderId) => {
    // In real app, this would add items back to cart
    alert(`Reordering items from ${orderId}`);
  };

  const cancelOrder = (orderId) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel order ${orderId}? This action cannot be undone.`);
    if (confirmCancel) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
      alert(`Order ${orderId} has been cancelled.`);
    }
  };

  return (
    <motion.div
      className="orders"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your medicine orders</p>
      </div>

      <motion.div
        className="orders-filters"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Orders
        </button>
        <button
          className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
          onClick={() => setFilter('processing')}
        >
          Processing
        </button>
        <button
          className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
          onClick={() => setFilter('shipped')}
        >
          Shipped
        </button>
        <button
          className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilter('delivered')}
        >
          Delivered
        </button>
        <button
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </button>
      </motion.div>

      {selectedOrder && (
        <motion.div
          className="order-details-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details - {selectedOrder.id}</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Order Information</h3>
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {getStatusText(selectedOrder.status)}</p>
                <p><strong>Total Amount:</strong> ₹{selectedOrder.total}</p>
              </div>
              <div className="detail-section">
                <h3>Items Ordered</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="detail-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Qty: {item.quantity}</span>
                    <span className="item-price">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="orders-list">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className="order-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.id}</h3>
                <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="order-status">
                {getStatusIcon(order.status)}
                <span className={`status-text ${order.status}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <strong>Total: ₹{order.total}</strong>
              </div>
              <div className="order-actions">
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(order)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View Details
                </motion.button>
                {(order.status === 'processing' || order.status === 'shipped') && (
                  <motion.button
                    className="btn btn-danger"
                    onClick={() => cancelOrder(order.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaBan /> Cancel Order
                  </motion.button>
                )}
                {order.status === 'delivered' && (
                  <motion.button
                    className="btn btn-primary"
                    onClick={() => reorder(order.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRedo /> Reorder
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <motion.div
          className="no-orders"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet.</p>
          <button className="btn btn-primary">Start Shopping</button>
        </motion.div>
      )}

      <motion.div
        className="orders-summary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2>Order Summary</h2>
        <div className="summary-stats">
          <div className="stat">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat">
            <h3>{orders.filter(o => o.status === 'delivered').length}</h3>
            <p>Delivered</p>
          </div>
          <div className="stat">
            <h3>₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</h3>
            <p>Total Spent</p>
          </div>
          <div className="stat">
            <h3>{orders.filter(o => o.status === 'processing' || o.status === 'shipped').length}</h3>
            <p>In Transit</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Orders;
