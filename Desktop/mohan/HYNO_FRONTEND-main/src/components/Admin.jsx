import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShoppingCart, FaChartLine, FaExclamationTriangle, FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useProducts } from '../contexts/ProductContext';
import { useToast } from '../contexts/ToastContext';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: ''
  });

  const { products, addProduct } = useProducts();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    // Mock data - in real app, this would come from APIs
    setStats({
      totalUsers: 1250,
      totalOrders: 345,
      totalRevenue: 45678.90,
      pendingOrders: 23
    });

    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-01-10' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', joinDate: '2023-12-20' }
    ]);

    setOrders([
      { id: 'ORD-001', customer: 'John Doe', total: 45.99, status: 'pending', date: '2024-01-15' },
      { id: 'ORD-002', customer: 'Jane Smith', total: 23.49, status: 'completed', date: '2024-01-14' },
      { id: 'ORD-003', customer: 'Bob Johnson', total: 67.98, status: 'processing', date: '2024-01-13' }
    ]);

    // Use products from context instead of mock data
    setMedicines(products.map(product => ({
      id: product.id,
      name: product.name,
      stock: product.inStock ? 100 : 0, // Mock stock based on inStock
      price: product.price,
      status: product.inStock ? 'in-stock' : 'out-of-stock'
    })));
  }, [products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      showError('Please fill in all required fields');
      return;
    }

    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || '/products/default.jpg'
    });

    showSuccess('Product added successfully!');
    setNewProduct({ name: '', price: '', category: '', image: '' });
    setShowAddProductForm(false);
  };

  const renderDashboard = () => (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon users">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon orders">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon revenue">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue?.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon pending">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </motion.div>
      </div>

      <div className="dashboard-charts">
        <motion.div
          className="chart-placeholder"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Revenue Chart</h3>
          <div className="chart-content">
            <p>Revenue over time chart would go here</p>
          </div>
        </motion.div>

        <motion.div
          className="chart-placeholder"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Order Status Distribution</h3>
          <div className="chart-content">
            <p>Order status pie chart would go here</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderUsers = () => (
    <motion.div
      className="users-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="management-header">
        <h2>User Management</h2>
        <button className="btn btn-primary">Add New User</button>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <FaEye />
                    </button>
                    <button className="btn-icon">
                      <FaEdit />
                    </button>
                    <button className="btn-icon danger">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div
      className="orders-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="management-header">
        <h2>Order Management</h2>
        <div className="filters">
          <select>
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>₹{order.total}</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <FaEye />
                    </button>
                    <button className="btn-icon">
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderMedicines = () => (
    <motion.div
      className="medicines-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="management-header">
        <h2>Medicine Inventory</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddProductForm(!showAddProductForm)}
        >
          <FaPlus /> Add New Product
        </button>
      </div>

      {showAddProductForm && (
        <motion.div
          className="add-product-form"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="form-group">
              <label>Price *</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              >
                <option value="">Select category</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Allergy">Allergy</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Blood Pressure">Blood Pressure</option>
                <option value="Cholesterol">Cholesterol</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                placeholder="Enter image URL (optional)"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Add Product</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAddProductForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <motion.tr
                key={medicine.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.stock}</td>
                <td>₹{medicine.price}</td>
                <td>
                  <span className={`status ${medicine.status}`}>
                    {medicine.status.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <FaEye />
                    </button>
                    <button className="btn-icon">
                      <FaEdit />
                    </button>
                    <button className="btn-icon danger">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'orders': return renderOrders();
      case 'medicines': return renderMedicines();
      default: return renderDashboard();
    }
  };

  return (
    <motion.div
      className="admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your pharmacy operations</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab ${activeTab === 'medicines' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicines')}
        >
          Medicines
        </button>
      </div>

      <div className="admin-content">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Admin;
