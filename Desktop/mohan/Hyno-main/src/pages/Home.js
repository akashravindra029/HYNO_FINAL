import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { categories, products } from '../data/mockData';
import { FaArrowRight, FaStar, FaTag } from 'react-icons/fa';
import { formatPrice } from '../utils/currency';
import { useOffer } from '../contexts/OfferContext';

const Home = () => {
  const navigate = useNavigate();
  const { offers } = useOffer();

  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  // Get active offers
  const activeOffers = offers.filter(offer => offer.active);

  return (
    <main className="pt-16">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find everything you need for your health and wellness journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/products?category=${encodeURIComponent(category)}`)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                    <span className="text-2xl font-bold text-primary-600">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{category}</h3>
                  <p className="text-sm text-gray-600">Explore {category.toLowerCase()} products</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {activeOffers.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
                Special Offers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don't miss out on these amazing deals! Use the coupon codes below at checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOffers.map((offer) => (
                <motion.div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border-l-4 border-green-500"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    <FaTag className="text-green-500 mr-3 text-xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{offer.code}</h3>
                      <p className="text-sm text-gray-600">
                        {offer.type === 'percentage' ? `${offer.value}% off` : `$${offer.value} off`}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{offer.description}</p>
                  <div className="text-sm text-gray-600">
                    <p>Min. order: {formatPrice(offer.minOrder)}</p>
                    {offer.maxDiscount && <p>Max. discount: {formatPrice(offer.maxDiscount)}</p>}
                    <p>Valid until: {new Date(offer.expiryDate).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Discover our most popular and highly-rated products
              </p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="hidden md:flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View All Products
              <FaArrowRight className="ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate('/products')}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-soft">
                    <div className="flex items-center">
                      <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-800">
                        {(Math.random() * 0.5 + 4.5).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <button
              onClick={() => navigate('/products')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Care of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust HyNo Pharmacy for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Start Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
