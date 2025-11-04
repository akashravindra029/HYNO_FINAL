import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaSort, FaFilter, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { products as initialProducts, categories } from '../data/mockData';
import { getProducts } from '../utils/localStorage';
import { formatPrice } from '../utils/currency';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(() => {
    const savedProducts = getProducts();
    return savedProducts || initialProducts;
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchTerm, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4.5);
    const hasHalfStar = (rating || 4.5) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 h-4 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="w-4 h-4 text-yellow-400 opacity-50" />);
    }
    return stars;
  };

  return (
    <main className="pt-20 pb-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600">Discover quality medicines and healthcare products</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-600 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-gray-600 w-5 h-5" />
              <span className="font-semibold text-gray-700">Categories:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'All'
                    ? 'bg-primary-600 text-white shadow-medium'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-medium'
                      : 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-300 group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-soft">
                  <div className="flex items-center">
                    {renderStars(product.rating || 4.5)}
                    <span className="ml-1 text-sm font-semibold text-gray-800">
                      {(product.rating || 4.5).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  In Stock
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-primary-600 text-sm font-medium mb-2">{product.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {renderStars(product.rating || 4.5)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        ({Math.floor(Math.random() * 100) + 10} reviews)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-3 rounded-lg text-sm font-semibold flex items-center shadow-medium hover:shadow-large transition-all duration-300 transform hover:scale-105"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('name');
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
