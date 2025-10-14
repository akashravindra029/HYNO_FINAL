import React from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../styles/OrderHistory.css';

function OrderHistory() {
  const navigate = useNavigate();

  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]') || [];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Information Form", 10, 10);
    doc.text("Please fill out the patient information form.", 10, 20);
    doc.text("Patient ID: ____________________", 10, 40);
    doc.text("Name: __________________________", 10, 50);
    doc.text("Email: _________________________", 10, 60);
    doc.text("Phone: _________________________", 10, 70);
    doc.text("Gender: ________________________", 10, 80);
    doc.save("patient_information_form.pdf");
  };

  if (orders.length === 0) {
    return (
      <div className="order-history-container fade-in">
        <h2>Order History</h2>
        <p>No orders found.</p>
        <button onClick={() => navigate('/medicines')} className="shop-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="order-history-container fade-in">
      <h2>Order History</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <p className="order-date">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="order-total">Total: ${order.total}</p>
            </div>
            <div className="order-details">
              <h4>Items Ordered:</h4>
              <div className="order-items">
                {(order.items || []).filter(item => item && item.name).map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <h5>{item.name}</h5>
                      <p>{item.brand} • {item.strength} • {item.packSize}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              {order.shippingInfo && (
                <div className="shipping-info">
                  <h4>Shipping Information:</h4>
                  <p>{order.shippingInfo.name}</p>
                  <p>{order.shippingInfo.street}</p>
                  <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</p>
                  <p>Phone: {order.shippingInfo.phone}</p>
                  <p>Shipping Method: {order.shippingMethod === 'standard' ? 'Standard (Free)' : 'Express ($9.99)'}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="download-section">
        <p>Would you like to download the PDF form?</p>
        <button onClick={generatePDF} className="download-btn">
          Download PDF Form
        </button>
      </div>
      <button onClick={() => navigate('/medicines')} className="shop-btn">
        Continue Shopping
      </button>
    </div>
  );
}

export default OrderHistory;
