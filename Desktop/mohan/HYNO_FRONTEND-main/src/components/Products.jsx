import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';
import { ProductsGridSkeleton } from './LoadingSkeleton';
import './Products.css';

const Products = () => {
  const { showSuccess } = useToast();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Skin Care', 'Digestive Health'];

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockProducts = [
        { id: 1, name: 'Paracetamol 500mg', price: 5.99, category: 'Pain Relief', image: 'https://via.placeholder.com/200', rating: 4.5, inStock: true },
        { id: 2, name: 'Ibuprofen 200mg', price: 7.49, category: 'Pain Relief', image: 'https://via.placeholder.com/200', rating: 4.2, inStock: true },
        { id: 3, name: 'Amoxicillin 500mg', price: 12.99, category: 'Antibiotics', image: 'https://via.placeholder.com/200', rating: 4.8, inStock: false },
        { id: 4, name: 'Vitamin C 1000mg', price: 15.99, category: 'Vitamins', image: 'https://via.placeholder.com/200', rating: 4.6, inStock: true },
        { id: 5, name: 'Cetirizine 10mg', price: 8.49, category: 'Allergy', image: 'https://via.placeholder.com/200', rating: 4.3, inStock: true },
        { id: 6, name: 'Omeprazole 20mg', price: 9.99, category: 'Digestive Health', image: 'https://via.placeholder.com/200', rating: 4.7, inStock: true },
        { id: 7, name: 'Aspirin 75mg', price: 4.99, category: 'Pain Relief', image: 'https://via.placeholder.com/200', rating: 4.1, inStock: true },
        { id: 8, name: 'Multivitamin Tablets', price: 18.99, category: 'Vitamins', image: 'https://via.placeholder.com/200', rating: 4.4, inStock: true },
        { id: 9, name: 'Loratadine 10mg', price: 6.99, category: 'Allergy', image: 'https://via.placeholder.com/200', rating: 4.5, inStock: true },
        { id: 10, name: 'Metformin 500mg', price: 11.49, category: 'Diabetes', image: 'https://via.placeholder.com/200', rating: 4.6, inStock: true },
        { id: 11, name: 'Hydrocortisone Cream', price: 9.99, category: 'Skin Care', image: 'https://via.placeholder.com/200', rating: 4.3, inStock: false },
        { id: 12, name: 'Simvastatin 20mg', price: 14.99, category: 'Cholesterol', image: 'https://via.placeholder.com/200', rating: 4.7, inStock: true },
        { id: 13, name: 'Lisinopril 10mg', price: 8.49, category: 'Blood Pressure', image: 'https://via.placeholder.com/200', rating: 4.2, inStock: true },
        { id: 14, name: 'Azithromycin 250mg', price: 16.99, category: 'Antibiotics', image: 'https://via.placeholder.com/200', rating: 4.8, inStock: false },
        { id: 15, name: 'Folic Acid 400mcg', price: 7.99, category: 'Vitamins', image: 'https://via.placeholder.com/200', rating: 4.5, inStock: true },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1500); // Simulate 1.5 second loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category === selectedCategory)
    );

    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart successfully!`);
  };

  const handleToggleWishlist = (product) => {
    toggleWishlist(product);
    const isWishlisted = isInWishlist(product.id);
    showSuccess(`${product.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist!`);
  };

  return (
    <motion.div
      className="products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Find the medicines you need with ease</p>
      </div>

      {/* Search and Filter Bar */}
      <motion.div
        className="filters-bar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <ProductsGridSkeleton count={8} />
      ) : (
        <motion.div
          className="products-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={() => handleToggleWishlist(product)}
                >
                  <FaHeart />
                </button>
                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                  <span>({product.rating})</span>
                </div>
                <p className="product-price">₹{product.price}</p>
                <p className="product-category">{product.category}</p>
              </div>

              <motion.button
                className={`btn ${product.inStock ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => product.inStock && handleAddToCart(product)}
                disabled={!product.inStock}
                whileHover={product.inStock ? { scale: 1.05 } : {}}
                whileTap={product.inStock ? { scale: 0.95 } : {}}
              >
                <FaShoppingCart /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredProducts.length === 0 && (
        <motion.div
          className="no-products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;
