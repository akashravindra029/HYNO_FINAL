import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturedProducts.css";

function FeaturedProducts() {
  const ads = [
    {
      id: 1,
      title: "🩺 Online Doctor Consultation",
      description: "Get expert medical advice from certified doctors.",
      details: "Consult with licensed physicians from the comfort of your home, 24/7 availability. Video calls, prescriptions, and follow-up care.",
      image: "/images/consult-adver.jpeg",
      badge: "Popular",
      link: "/consultation"
    },
    {
      id: 2,
      title: "💊 25% Off on Vitamins & Supplements",
      description: "Boost your immunity with premium vitamins.",
      details: "Exclusive offer on all top vitamin and supplement brands. Free shipping on orders over $50. Doctor-recommended formulas.",
      image: "/images/vitamin-adver.jpeg",
      badge: "Limited Time",
      link: "/medicines"
    },
    {
      id: 3,
      title: "🧬 Health Checkup Packages",
      description: "Comprehensive health screenings at affordable prices.",
      details: "Includes blood tests, ECG, BMI check, and more. Early detection saves lives. Book home collection service.",
      image: "https://via.placeholder.com/300x200/008080/ffffff?text=Health+Checkup+Packages",
      badge: "Trusted",
      link: "/medicines"
    },
    {
      id: 4,
      title: "🚑 Emergency Medical Kit",
      description: "Be prepared with our essential emergency kit.",
      details: "Complete first-aid kit with medicines, bandages, and emergency supplies. FDA-approved. Ready for any situation.",
      image: "https://via.placeholder.com/300x200/007bff/ffffff?text=Emergency+Medical+Kit",
      badge: "Essential",
      link: "/medicines"
    },
  ];

  const [flippedCards, setFlippedCards] = useState([]);

  const handleFlip = (id) => {
    setFlippedCards((prev) =>
      prev.includes(id)
        ? prev.filter((cardId) => cardId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="featured-products">
      <div className="container">
        <h2>Featured Services & Offers</h2>
        <div className="products-grid">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`product-card ${flippedCards.includes(ad.id) ? "flipped" : ""}`}
            >
              <div className="card-inner">
                {/* Front */}
                <div className="card-front">
                  <div className="card-badge">{ad.badge}</div>
                  <img src={ad.image} alt={ad.title} />
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => handleFlip(ad.id)}>
                      Learn More
                    </button>
                    <Link to={ad.link} className="btn btn-secondary">
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Back */}
                <div className="card-back">
                  <h3>{ad.title}</h3>
                  <p>{ad.details}</p>
                  <div className="card-actions">
                    <Link to={ad.link} className="btn btn-primary">
                      Get Started
                    </Link>
                    <button className="btn btn-secondary" onClick={() => handleFlip(ad.id)}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
