import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Initialize with default products if none in storage
      const defaultProducts = [
        { id: 1, name: 'Paracetamol 500mg', price: 5.99, category: 'Pain Relief', image: '/products/paracetamol.jpg', rating: 4.5, inStock: true },
        { id: 2, name: 'Ibuprofen 200mg', price: 7.49, category: 'Pain Relief', image: '/products/ibuprofen.jpg', rating: 4.2, inStock: true },
        { id: 3, name: 'Amoxicillin 500mg', price: 12.99, category: 'Antibiotics', image: '/products/amoxicillin.jpg', rating: 4.8, inStock: false },
        { id: 4, name: 'Vitamin C 1000mg', price: 15.99, category: 'Vitamins', image: '/products/vitamin-c.jpg', rating: 4.6, inStock: true },
        { id: 5, name: 'Cetirizine 10mg', price: 8.49, category: 'Allergy', image: '/products/cetrizine.jpg', rating: 4.3, inStock: true },
        { id: 6, name: 'Omeprazole 20mg', price: 9.99, category: 'Digestive Health', image: '/products/omeprazole.jpg', rating: 4.7, inStock: true },
        { id: 7, name: 'Aspirin 75mg', price: 4.99, category: 'Pain Relief', image: '/products/aspirin.jpg', rating: 4.1, inStock: true },
        { id: 8, name: 'Multivitamin Tablets', price: 18.99, category: 'Vitamins', image: '/products/multivitamin.jpg', rating: 4.4, inStock: true },
        { id: 9, name: 'Loratadine 10mg', price: 6.99, category: 'Allergy', image: '/products/loratadine.jpg', rating: 4.5, inStock: true },
        { id: 10, name: 'Metformin 500mg', price: 11.49, category: 'Diabetes', image: '/products/metformin.jpg', rating: 4.6, inStock: true },
        { id: 11, name: 'Hydrocortisone Cream', price: 9.99, category: 'Skin Care', image: '/products/hydrocortisone.jpg', rating: 4.3, inStock: false },
        { id: 12, name: 'Simvastatin 20mg', price: 14.99, category: 'Cholesterol', image: '/products/simvastatin.jpg', rating: 4.7, inStock: true },
        { id: 13, name: 'Lisinopril 10mg', price: 8.49, category: 'Blood Pressure', image: '/products/lisinopril.jpg', rating: 4.2, inStock: true },
        { id: 14, name: 'Azithromycin 250mg', price: 16.99, category: 'Antibiotics', image: '/products/azithromycin.jpg', rating: 4.8, inStock: false },
        { id: 15, name: 'Folic Acid 400mcg', price: 7.99, category: 'Vitamins', image: '/products/folic-acid.jpg', rating: 4.5, inStock: true },
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // Simple ID generation
      rating: 4.0, // Default rating
      inStock: true, // Default in stock
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return ['All', ...categories];
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};
