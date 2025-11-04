import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { OfferProvider } from './contexts/OfferContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageProducts from './admin/ManageProducts';
import ManageUsers from './admin/ManageUsers';
import ManageOrders from './admin/ManageOrders';
import PrescriptionViewer from './admin/PrescriptionViewer';

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <OfferProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* User Routes */}
                <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
                <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
                <Route path="/blog" element={<><Navbar /><Blog /><Footer /></>} />
                <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
                <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
                <Route path="/orders" element={<><Navbar /><Orders /><Footer /></>} />
                <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/orders" element={<ManageOrders />} />
                <Route path="/admin/prescriptions" element={<PrescriptionViewer />} />
              </Routes>
            </div>
          </Router>
        </OfferProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
