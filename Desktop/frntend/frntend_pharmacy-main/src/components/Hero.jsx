import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const advertisements = [
    "🛒 Free delivery on orders above ₹500",
    "💊 Get expert consultation from licensed pharmacists",
    "🏥 Wide range of medicines and health products",
    "🔒 Secure payment and fast delivery guaranteed",
    "📱 Order online and get doorstep delivery",
    "⭐ 4.8/5 rating from 10,000+ customers",
    "💳 Cash on delivery available",
    "🕒 24/7 customer support"
  ];

  return (
    <section className="hero">
      <div className="scrolling-ad">
        <div className="ad-content">
          {advertisements.map((ad, index) => (
            <span key={index} className="ad-item">
              {ad}
            </span>
          ))}
        </div>
      </div>
      <div className="hero-container container">
        <div className="hero-content">
          <h1>Your Trusted HYNO PHARMA Partner</h1>
          <p>Get quality medicines, expert advice, and fast delivery. Shop with confidence from licensed pharmacists.</p>
          <div className="buttons-container">
            <Link to="/medicines" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hyno pharma.jpg" alt="Hyno Pharmacy - Your Trusted Healthcare Partner" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
