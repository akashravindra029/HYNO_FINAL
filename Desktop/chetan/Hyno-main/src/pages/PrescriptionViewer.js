import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePrescription, FaSignOutAlt, FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { orders } from '../data/mockData';

const PrescriptionViewer = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/admin');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaFilePrescription, path: '/admin/dashboard' },
    { name: 'Manage Products', icon: FaFilePrescription, path: '/admin/products' },
    { name: 'Manage Users', icon: FaFilePrescription, path: '/admin/users' },
    { name: 'Manage Orders', icon: FaFilePrescription, path: '/admin/orders' },
    { name: 'Prescriptions', icon: FaFilePrescription, path: '/admin/prescriptions', active: true },
  ];

  const ordersWithPrescriptions = orders.filter(order => order.prescription);

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
          <h2 className="text-3xl font-bold text-gray-800">Prescription Viewer</h2>
          <p className="text-gray-600 mt-2">View prescriptions uploaded by customers</p>
        </div>

        {ordersWithPrescriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaFilePrescription className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No prescriptions found</h3>
            <p className="text-gray-500">There are no prescriptions uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersWithPrescriptions.map((order) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status.toLowerCase() === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status.toLowerCase() === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600"><strong>Customer:</strong> {order.userName}</p>
                  <p className="text-sm text-gray-600"><strong>Date:</strong> {order.date}</p>
                  <p className="text-sm text-gray-600"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Ordered Items:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Prescription:</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{order.prescription}</span>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <FaEye className="mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Prescription Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Prescription for Order #{selectedOrder.id}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Order Details</h4>
                  <p className="text-sm text-gray-600"><strong>Customer:</strong> {selectedOrder.userName}</p>
                  <p className="text-sm text-gray-600"><strong>Date:</strong> {selectedOrder.date}</p>
                  <p className="text-sm text-gray-600"><strong>Status:</strong> {selectedOrder.status}</p>
                  <p className="text-sm text-gray-600"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Ordered Items</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-700 mb-4">Prescription Image</h4>
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <img
                    src={`https://via.placeholder.com/400x300?text=${selectedOrder.prescription}`}
                    alt="Prescription"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500 mt-2">{selectedOrder.prescription}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionViewer;
