import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Products from './components/Products';
import User from './components/User';
import Orders from './components/Orders';
import Payments from './components/Payments';
import Prescriptions from './components/Prescriptions';
import Cart from './components/Cart';
import Medicine from './components/Medicine';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import OrderCheckout from './components/OrderCheckout';
import Advertisement from './components/Advertisement';
import Category from './components/Category';
import About from './About';
import LandingPage from './components/LandingPage'; // ✅ Added this line
import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* ✅ Landing page has no Header/SideNav/Footer */}
              <Route path="/" element={<LandingPage />} />

              {/* ✅ All other routes with layout */}
              <Route
                path="/*"
                element={
                  <div className="App">
                    <Header />
                    <SideNav />
                    <motion.main
                      className="main-content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/prescriptions" element={<Prescriptions />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/medicine" element={<Medicine />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/checkout" element={<OrderCheckout />} />
                        <Route path="/advertisement" element={<Advertisement />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                      </Routes>
                    </motion.main>
                    <Footer />
                  </div>
                }
              />
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
