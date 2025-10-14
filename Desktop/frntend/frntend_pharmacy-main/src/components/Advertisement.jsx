import React, { useState } from "react";
import "../styles/Advertisement.css";

function Advertisement() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const ads = [
    {
      id: 1,
      title: "Free Online Doctor Consultation",
      description: "Get expert medical advice from home. Our certified doctors are available 24/7 to provide personalized consultations via video call or chat. No need to visit a clinic; get prescriptions and health tips from the comfort of your home.",
      image: "https://via.placeholder.com/300x150/28a745/ffffff?text=Free+Consultation",
      link: "#"
    },
    {
      id: 2,
      title: "20% Off on Vitamins & Supplements",
      description: "Boost your immunity with our range of vitamins. Enjoy 20% discount on all vitamin supplements including Vitamin C, D, and multivitamins. Limited time offer - stock up on essential nutrients for better health.",
      image: "https://via.placeholder.com/300x150/ffc107/000000?text=20%25+Off+Vitamins",
      link: "#"
    },
    {
      id: 3,
      title: "Health Checkup Packages",
      description: "Comprehensive health screenings at affordable prices. Our packages include blood tests, ECG, X-rays, and doctor consultations. Early detection is key to prevention - book your checkup today and stay healthy.",
      image: "https://via.placeholder.com/300x150/dc3545/ffffff?text=Health+Checkup",
      link: "#"
    }
  ];

  return (
    <div className="advertisement">
      <h2>Medical Advertisements</h2>
      <div className="ads-grid">
        {ads.map(ad => (
          <div className={`ad-card ${flipped[ad.id] ? 'flipped' : ''}`} key={ad.id}>
            <div className="ad-card-inner">
              <div className="ad-card-front">
                <img src={ad.image} alt={ad.title} />
                <h3>{ad.title}</h3>
                <button className="learn-more-btn" onClick={() => toggleFlip(ad.id)}>Learn More</button>
              </div>
              <div className="ad-card-back">
                <p>{ad.description}</p>
                <button className="back-btn" onClick={() => toggleFlip(ad.id)}>Back</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advertisement;
