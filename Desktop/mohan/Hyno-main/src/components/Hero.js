import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShieldAlt, FaClock, FaTruck } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-6 leading-tight">
            Your Health, Our <span className="text-secondary-600">Priority</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover a wide range of medicines and healthcare products at HyNo Pharmacy.
            Trusted by millions for quality healthcare solutions.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for medicines, health products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-primary-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 shadow-soft"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors duration-300"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-medium hover:shadow-large transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Medicines
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300">
              <FaShieldAlt className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">100% Genuine</h3>
              <p className="text-gray-600">Authentic medicines from trusted manufacturers</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300">
              <FaClock className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer care assistance</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300">
              <FaTruck className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable doorstep delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
