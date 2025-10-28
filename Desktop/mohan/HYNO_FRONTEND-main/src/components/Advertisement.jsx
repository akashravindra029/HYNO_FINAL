import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import './Advertisement.css';

const Advertisement = ({ isOpen, onClose, ads = [] }) => {
  const [currentAd, setCurrentAd] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Mock ads data if none provided
  const defaultAds = [
    {
      id: 1,
      title: "Free Health Consultation",
      description: "Get expert advice from our certified pharmacists",
      image: "https://via.placeholder.com/600x300/667eea/ffffff?text=Free+Consultation",
      cta: "Book Now",
      discount: "FREE"
    },
    {
      id: 2,
      title: "20% Off First Order",
      description: "New customers get 20% off on their first purchase",
      image: "https://via.placeholder.com/600x300/27ae60/ffffff?text=20%25+OFF",
      cta: "Shop Now",
      discount: "20% OFF"
    },
    {
      id: 3,
      title: "Prescription Delivery",
      description: "Fast and secure prescription delivery to your door",
      image: "https://via.placeholder.com/600x300/e74c3c/ffffff?text=Prescription+Delivery",
      cta: "Upload Prescription",
      discount: "FAST"
    }
  ];

  const adData = ads.length > 0 ? ads : defaultAds;

  useEffect(() => {
    if (!isOpen || !isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isOpen, isAutoPlay, adData.length]);

  const nextAd = () => {
    setCurrentAd((prev) => (prev + 1) % adData.length);
  };

  const prevAd = () => {
    setCurrentAd((prev) => (prev - 1 + adData.length) % adData.length);
  };

  const handleCtaClick = () => {
    // Handle CTA action
    console.log('CTA clicked for ad:', adData[currentAd].title);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="advertisement-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="advertisement-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="ad-content">
          <motion.div
            className="ad-image-container"
            key={currentAd}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={adData[currentAd].image}
              alt={adData[currentAd].title}
              className="ad-image"
            />
            <div className="ad-discount-badge">
              {adData[currentAd].discount}
            </div>
          </motion.div>

          <motion.div
            className="ad-details"
            key={`details-${currentAd}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>{adData[currentAd].title}</h2>
            <p>{adData[currentAd].description}</p>

            <motion.button
              className="cta-btn"
              onClick={handleCtaClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {adData[currentAd].cta}
            </motion.button>
          </motion.div>
        </div>

        {adData.length > 1 && (
          <div className="ad-navigation">
            <button className="nav-btn" onClick={prevAd}>
              <FaChevronLeft />
            </button>

            <div className="ad-indicators">
              {adData.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentAd ? 'active' : ''}`}
                  onClick={() => setCurrentAd(index)}
                />
              ))}
            </div>

            <button className="nav-btn" onClick={nextAd}>
              <FaChevronRight />
            </button>
          </div>
        )}

        <div className="ad-controls">
          <button
            className="autoplay-btn"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
          >
            {isAutoPlay ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Advertisement;
