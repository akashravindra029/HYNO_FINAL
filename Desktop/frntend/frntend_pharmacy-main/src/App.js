import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import "./styles/App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import Advertisement from "./components/Advertisement";
import PaymentOffers from "./components/PaymentOffers";



import Footer from "./components/Footer";
import Prescription from "./components/Prescription";
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import PatientForm from "./components/PatientForm";
import Medicines from "./components/Medicines";
import LabTests from "./components/LabTests";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import DoctorConsultation from "./components/DoctorConsultation";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={
            <div className="App">
              <Header />
              <Hero />
              <FeaturedProducts />
              <Categories />
              <Advertisement />
              <PaymentOffers />
              <Footer />
            </div>
          } />
          <Route path="/prescription" element={
            <div className="App">
              <Header />
              <Prescription />
              <Footer />
            </div>
          } />
          <Route path="/medicines" element={
            <div className="App">
              <Header />
              <Medicines />
              <Footer />
            </div>
          } />
          <Route path="/lab-tests" element={
            <div className="App">
              <Header />
              <LabTests />
              <Footer />
            </div>
          } />
          <Route path="/payment-offers" element={
            <div className="App">
              <Header />
              <PaymentOffers />
              <Footer />
            </div>
          } />
          <Route path="/about-us" element={
            <div className="App">
              <Header />
              <AboutUs />
              <Footer />
            </div>
          } />
          <Route path="/faqs" element={
            <div className="App">
              <Header />
              <FAQs />
              <Footer />
            </div>
          } />
          <Route path="/privacy-policy" element={
            <div className="App">
              <Header />
              <PrivacyPolicy />
              <Footer />
            </div>
          } />
          <Route path="/patient-form" element={
            <div className="App">
              <Header />
              <PatientForm />
              <Footer />
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/consultation" element={
            <div className="App">
              <Header />
              <DoctorConsultation />
              <Footer />
            </div>
          } />
          <Route path="/cart" element={
            <div className="App">
              <Header />
              <Cart />
              <Footer />
            </div>
          } />
          <Route path="/checkout" element={
            <div className="App">
              <Header />
              <Checkout />
              <Footer />
            </div>
          } />
          <Route path="/order-history" element={
            <div className="App">
              <Header />
              <OrderHistory />
              <Footer />
            </div>
          } />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
