import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPlus, FaTrash, FaCheckCircle } from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/26',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'debit',
      cardNumber: '**** **** **** 5678',
      expiryDate: '08/25',
      cardholderName: 'John Doe',
      isDefault: false
    }
  ]);

  const [transactions] = useState([
    { id: 1, date: '2024-01-15', amount: -45.99, description: 'Order #ORD-001', status: 'completed' },
    { id: 2, date: '2024-01-12', amount: -23.49, description: 'Order #ORD-002', status: 'completed' },
    { id: 3, date: '2024-01-10', amount: 50.00, description: 'Refund - Order #ORD-004', status: 'completed' },
    { id: 4, date: '2024-01-08', amount: -12.99, description: 'Order #ORD-003', status: 'pending' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleAddCard = () => {
    // In real app, this would validate and save to backend
    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      type: 'credit',
      cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
      expiryDate: newCard.expiryDate,
      cardholderName: newCard.cardholderName,
      isDefault: false
    };
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
    setShowAddForm(false);
    alert('Payment method added successfully!');
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(card => card.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
  };

  const formatAmount = (amount) => {
    return amount > 0 ? `+₹${amount.toFixed(2)}` : `-₹${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <motion.div
      className="payments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="payments-header">
        <h1>Payment Methods & History</h1>
        <p>Manage your payment methods and view transaction history</p>
      </div>

      <div className="payments-content">
        {/* Payment Methods */}
        <motion.section
          className="payment-methods"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-header">
            <h2>Payment Methods</h2>
            <motion.button
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Add New Card
            </motion.button>
          </div>

          {showAddForm && (
            <motion.div
              className="add-card-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3>Add New Payment Method</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddCard(); }}>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="CVV"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={newCard.cardholderName}
                    onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Card</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="cards-list">
            {paymentMethods.map((card, index) => (
              <motion.div
                key={card.id}
                className={`payment-card ${card.isDefault ? 'default' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-header">
                  <FaCreditCard className="card-icon" />
                  {card.isDefault && <span className="default-badge">Default</span>}
                </div>
                <div className="card-details">
                  <p className="card-number">{card.cardNumber}</p>
                  <p className="card-expiry">Expires {card.expiryDate}</p>
                  <p className="cardholder">{card.cardholderName}</p>
                </div>
                <div className="card-actions">
                  {!card.isDefault && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleSetDefault(card.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Transaction History */}
        <motion.section
          className="transaction-history"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Transaction History</h2>
          <div className="transactions-list">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                className="transaction-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="transaction-info">
                  <p className="transaction-description">{transaction.description}</p>
                  <p className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.amount > 0 ? 'credit' : 'debit'}`}>
                    {formatAmount(transaction.amount)}
                  </span>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status === 'completed' ? <FaCheckCircle /> : 'Pending'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Payment Summary */}
      <motion.div
        className="payment-summary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Payment Summary</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>{paymentMethods.length}</h3>
            <p>Payment Methods</p>
          </div>
          <div className="summary-card">
            <h3>₹{transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0).toFixed(2)}</h3>
            <p>Total Spent</p>
          </div>
          <div className="summary-card">
            <h3>₹{transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</h3>
            <p>Total Refunds</p>
          </div>
          <div className="summary-card">
            <h3>{transactions.filter(t => t.status === 'pending').length}</h3>
            <p>Pending Transactions</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Payments;
