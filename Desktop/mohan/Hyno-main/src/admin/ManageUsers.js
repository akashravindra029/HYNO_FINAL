import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, saveUsers } from '../utils/localStorage';
import { users as initialUsers } from '../data/mockData';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = getUsers() || initialUsers;
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/admin');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaUsers, path: '/admin/dashboard' },
    { name: 'Manage Products', icon: FaUsers, path: '/admin/products' },
    { name: 'Manage Users', icon: FaUsers, path: '/admin/users', active: true },
    { name: 'Manage Orders', icon: FaUsers, path: '/admin/orders' },
    { name: 'Prescriptions', icon: FaUsers, path: '/admin/prescriptions' },
  ];

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
          <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
          <p className="text-gray-600 mt-2">View and manage registered users</p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.gender}, {new Date().getFullYear() - new Date(user.dob).getFullYear()} years old</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      {user.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
            <p className="text-gray-500">There are no registered users yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
