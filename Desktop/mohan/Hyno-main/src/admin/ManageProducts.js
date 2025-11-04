import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaBox, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { products as initialProducts, categories } from '../data/mockData';
import { getProducts, saveProducts } from '../utils/localStorage';
import { formatPrice } from '../utils/currency';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    const savedProducts = getProducts();
    return savedProducts || initialProducts;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    image: '',
    imageFile: null,
  });

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/admin');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaBox, path: '/admin/dashboard' },
    { name: 'Manage Products', icon: FaBox, path: '/admin/products', active: true },
    { name: 'Manage Users', icon: FaBox, path: '/admin/users' },
    { name: 'Manage Orders', icon: FaBox, path: '/admin/orders' },
    { name: 'Prescriptions', icon: FaBox, path: '/admin/prescriptions' },
  ];

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        stock: product.stock,
        price: product.price,
        image: product.image,
        imageFile: null,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        stock: '',
        price: '',
        image: '',
        imageFile: null,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processProduct = (productData) => {
      if (formData.imageFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          const updatedProductData = { ...productData, image: dataUrl };
          if (editingProduct) {
            setProducts(products.map(p =>
              p.id === editingProduct.id ? updatedProductData : p
            ));
          } else {
            setProducts([...products, updatedProductData]);
          }
          closeModal();
        };
        reader.readAsDataURL(formData.imageFile);
      } else {
        if (editingProduct) {
          setProducts(products.map(p =>
            p.id === editingProduct.id ? productData : p
          ));
        } else {
          setProducts([...products, productData]);
        }
        closeModal();
      }
    };

    const baseProductData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      description: 'New product description',
    };

    if (!editingProduct) {
      baseProductData.id = Math.max(...products.map(p => p.id)) + 1;
    }

    processProduct(baseProductData);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
          <button
            onClick={() => openModal()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <FaPlus className="mr-2" />
            Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              className="bg-white rounded-lg p-8 w-full max-w-md mx-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload an image file or leave blank to use URL</p>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Image URL (optional)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL if not uploading file"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
