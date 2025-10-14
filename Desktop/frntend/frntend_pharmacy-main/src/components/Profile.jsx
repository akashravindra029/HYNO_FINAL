import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user } = useAuth();

  // Get real order history from localStorage
  const orders = (JSON.parse(localStorage.getItem('orders') || '[]') || []).map(order => ({
    id: `ORD${order.id}`,
    date: new Date(order.date).toLocaleDateString(),
    status: 'Processing', // In a real app, this would come from backend
    total: `$${order.total}`
  }));

  const prescriptions = [
    { id: 'RX001', date: '2024-04-20', fileName: 'prescription1.pdf' },
    { id: 'RX002', date: '2024-05-10', fileName: 'prescription2.jpg' }
  ];

  return (
    <div className="profile-container fade-in">
      <h2>Welcome, {user?.name || 'User'}</h2>
      <div className="profile-info">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
        </div>

        <div className="profile-section">
          <h3>Order History</h3>
          {orders.length > 0 ? (
            <ul className="order-list">
              {orders.map(order => (
                <li key={order.id} className="order-item">
                  <span>Order ID: {order.id}</span>
                  <span>Date: {order.date}</span>
                  <span>Status: {order.status}</span>
                  <span>Total: {order.total}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <div className="profile-section">
          <h3>Prescriptions</h3>
          {prescriptions.length > 0 ? (
            <ul className="prescription-list">
              {prescriptions.map(rx => (
                <li key={rx.id} className="prescription-item">
                  <span>ID: {rx.id}</span>
                  <span>Date: {rx.date}</span>
                  <button className="download-link" onClick={() => alert('Download functionality would be implemented here')}>{rx.fileName}</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
