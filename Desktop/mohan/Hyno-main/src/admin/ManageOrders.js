import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getOrders, saveOrders } from '../utils/localStorage';
import { orders as mockOrders } from '../data/mockData';
import { formatPrice } from '../utils/currency';

const ManageOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = getOrders() || mockOrders;
    // Ensure total is a valid number for each order
    const processedOrders = allOrders.map(order => {
      if (typeof order.total !== 'number' || isNaN(order.total)) {
        const calculatedTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return { ...order, total: calculatedTotal };
      }
      return order;
    });
    setOrders(processedOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/admin');
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaClipboardList, path: '/admin/dashboard' },
    { name: 'Manage Products', icon: FaClipboardList, path: '/admin/products' },
    { name: 'Manage Users', icon: FaClipboardList, path: '/admin/users' },
    { name: 'Manage Orders', icon: FaClipboardList, path: '/admin/orders', active: true },
    { name: 'Prescriptions', icon: FaClipboardList, path: '/admin/prescriptions' },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                item.active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`}
            >
              <item.icon className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Manage Orders</h2>
          <p className="text-gray-600 mt-2">View and update order statuses</p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="max-w-xs">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.name} (Qty: {item.quantity}) - {formatPrice(item.price)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <FaClipboardList className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders found</h3>
            <p className="text-gray-500">There are no orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
