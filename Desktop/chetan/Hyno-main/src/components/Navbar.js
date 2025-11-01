import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaGift, FaBox, FaUser, FaSignOutAlt, FaSearch, FaBars } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { getCurrentUser } from '../utils/localStorage';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/products', icon: FaShoppingCart, label: 'Products' },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', badge: getTotalItems() },
    { path: '/offers', icon: FaGift, label: 'Offers' },
    { path: '/orders', icon: FaBox, label: 'Orders' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <>
      <nav className="bg-white shadow-soft fixed top-0 left-0 right-0 z-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="md:hidden mr-4 text-primary-700 hover:text-primary-800 transition-colors duration-300"
              >
                <FaBars className="w-6 h-6" />
              </button>
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300">
                  HyNo Pharmacy
                </h1>
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border-2 border-primary-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700 shadow-soft'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <item.icon className="mr-2" />
                  {item.label}
                  {item.badge > 0 && (
                    <span className="ml-2 bg-secondary-500 text-white text-xs rounded-full px-2 py-1 font-bold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden lg:flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Welcome, {currentUser.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
              {currentUser && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-700">Welcome, {currentUser.name}</p>
                </div>
              )}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                    {item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleSidebar();
                  }}
                  className="flex items-center w-full mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openModal();
                    toggleSidebar();
                  }}
                  className="flex items-center w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
