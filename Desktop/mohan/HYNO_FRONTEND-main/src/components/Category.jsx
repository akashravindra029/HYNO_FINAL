import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';
import Medicine from './Medicine';
import './Category.css';

const Category = ({ categoryName = 'All Medicines' }) => {
  const { showSuccess } = useToast();
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock medicine data
    const mockMedicines = [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        brand: 'Generic',
        price: 5.99,
        originalPrice: 7.99,
        rating: 4.5,
        reviews: 128,
        stock: 150,
        prescription: false,
        discount: 25,
        image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Paracetamol',
        category: 'pain-relief',
        description: 'Effective pain relief and fever reducer',
        dosage: '500mg',
        form: 'Tablet',
        quantity: '30 tablets',
        inStock: true,
        prescriptionRequired: false,
        isWishlisted: false
      },
      {
        id: 2,
        name: 'Ibuprofen 200mg',
        brand: 'Advil',
        price: 7.49,
        originalPrice: null,
        rating: 4.3,
        reviews: 95,
        stock: 0,
        prescription: false,
        discount: 0,
        image: 'https://via.placeholder.com/300x300/27ae60/ffffff?text=Ibuprofen',
        category: 'pain-relief',
        description: 'Anti-inflammatory pain relief medication',
        dosage: '200mg',
        form: 'Tablet',
        quantity: '20 tablets',
        inStock: false,
        prescriptionRequired: false,
        isWishlisted: false
      },
      {
        id: 3,
        name: 'Amoxicillin 500mg',
        brand: 'Amoxil',
        price: 12.99,
        originalPrice: 15.99,
        rating: 4.7,
        reviews: 67,
        stock: 75,
        prescription: true,
        discount: 19,
        image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=Amoxicillin',
        category: 'antibiotics',
        description: 'Antibiotic for bacterial infections',
        dosage: '500mg',
        form: 'Capsule',
        quantity: '21 capsules',
        inStock: true,
        prescriptionRequired: true,
        isWishlisted: false
      },
      {
        id: 4,
        name: 'Vitamin D3 1000IU',
        brand: 'Nature Made',
        price: 9.99,
        originalPrice: null,
        rating: 4.6,
        reviews: 203,
        stock: 200,
        prescription: false,
        discount: 0,
        image: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=Vitamin+D3',
        category: 'vitamins',
        description: 'Essential vitamin for bone health',
        dosage: '1000IU',
        form: 'Softgel',
        quantity: '90 softgels',
        inStock: true,
        prescriptionRequired: false,
        isWishlisted: false
      },
      {
        id: 5,
        name: 'Omeprazole 20mg',
        brand: 'Prilosec',
        price: 8.49,
        originalPrice: 10.99,
        rating: 4.4,
        reviews: 156,
        stock: 120,
        prescription: false,
        discount: 23,
        image: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=Omeprazole',
        category: 'digestive',
        description: 'Acid reflux and heartburn relief',
        dosage: '20mg',
        form: 'Capsule',
        quantity: '28 capsules',
        inStock: true,
        prescriptionRequired: false,
        isWishlisted: false
      },
      {
        id: 6,
        name: 'Cetirizine 10mg',
        brand: 'Zyrtec',
        price: 6.99,
        originalPrice: null,
        rating: 4.2,
        reviews: 89,
        stock: 180,
        prescription: false,
        discount: 0,
        image: 'https://via.placeholder.com/300x300/1abc9c/ffffff?text=Cetirizine',
        category: 'allergy',
        description: '24-hour allergy relief',
        dosage: '10mg',
        form: 'Tablet',
        quantity: '30 tablets',
        inStock: true,
        prescriptionRequired: false,
        isWishlisted: false
      }
    ];

    setMedicines(mockMedicines);
    setFilteredMedicines(mockMedicines);
  }, []);

  useEffect(() => {
    let filtered = medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || medicine.category === filterBy;
      return matchesSearch && matchesFilter;
    });

    // Sort medicines
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredMedicines(filtered);
  }, [medicines, searchTerm, sortBy, filterBy]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'vitamins', label: 'Vitamins & Supplements' },
    { value: 'digestive', label: 'Digestive Health' },
    { value: 'allergy', label: 'Allergy & Cold' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const addToCart = (medicine) => {
    // In real app, this would dispatch to cart context/store
    showSuccess(`${medicine.name} added to cart successfully!`);
  };

  const toggleWishlist = (medicineId) => {
    // In real app, this would toggle wishlist
    const medicine = medicines.find(m => m.id === medicineId);
    const isWishlisted = medicine.isWishlisted || false;
    showSuccess(`${medicine.name} ${isWishlisted ? 'removed from' : 'added to'} wishlist!`);
  };

  return (
    <motion.div
      className="category-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="category-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categoryName}
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover our wide range of quality medicines and healthcare products
        </motion.p>
      </div>

      <div className="category-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="control-buttons">
          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>

          <div className="sort-dropdown">
            <FaSort />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <motion.div
        className={`filters-panel ${showFilters ? 'open' : ''}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="filter-groups">
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category.value} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={filterBy === category.value}
                    onChange={(e) => setFilterBy(e.target.value)}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Availability</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input type="checkbox" />
                <span>In Stock</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>Prescription Required</span>
              </label>
              <label className="filter-option">
                <input type="checkbox" />
                <span>On Sale</span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="category-results">
        <div className="results-header">
          <p>{filteredMedicines.length} products found</p>
        </div>

        <motion.div
          className="medicines-grid"
          layout
        >
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Medicine
                medicine={medicine}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredMedicines.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3>No medicines found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Category;
