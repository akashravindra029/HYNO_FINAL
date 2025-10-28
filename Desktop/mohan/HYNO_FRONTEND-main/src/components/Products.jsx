import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { ProductsGridSkeleton } from './LoadingSkeleton';
import './Products.css';

const Products = () => {
  const { showSuccess } = useToast();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { products, getCategories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  // Get categories from context
  const categories = getCategories();

  // Use products from context
  useEffect(() => {
    setLoading(true);
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setFilteredProducts(products);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [products]);

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
