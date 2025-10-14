import React from "react";
import { Link } from "react-router-dom";
import "../styles/LabTests.css";

function LabTests() {
  const labTests = [
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis for overall health assessment",
      price: "₹299",
      originalPrice: "₹499",
      discount: "40% OFF",
      image: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=CBC+Test",
      features: ["Home Collection", "24 Hours Report", "Certified Labs"]
    },
    {
      id: 2,
      title: "Diabetes Package",
      description: "Complete diabetes screening with HbA1c and glucose tests",
      price: "₹399",
      originalPrice: "₹699",
      discount: "43% OFF",
      image: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Diabetes+Package",
      features: ["Fasting Required", "Same Day Report", "Doctor Consultation"]
    },
    {
      id: 3,
      title: "Thyroid Profile",
      description: "Complete thyroid function test including T3, T4, TSH",
      price: "₹349",
      originalPrice: "₹599",
      discount: "42% OFF",
      image: "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Thyroid+Profile",
      features: ["No Fasting", "48 Hours Report", "Online Reports"]
    },
    {
      id: 4,
      title: "Vitamin D Test",
      description: "Essential vitamin D deficiency screening",
      price: "₹199",
      originalPrice: "₹349",
      discount: "43% OFF",
      image: "https://via.placeholder.com/300x200/F9CA24/FFFFFF?text=Vitamin+D+Test",
      features: ["Home Collection", "24 Hours Report", "Diet Consultation"]
    },
    {
      id: 5,
      title: "Full Body Checkup",
      description: "Comprehensive health package with 80+ tests",
      price: "₹999",
      originalPrice: "₹1999",
      discount: "50% OFF",
      image: "https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=Full+Body+Checkup",
      features: ["Home Collection", "7 Days Report", "Health Card"]
    },
    {
      id: 6,
      title: "COVID-19 RT-PCR Test",
      description: "Accurate COVID-19 testing with quick results",
      price: "₹450",
      originalPrice: "₹650",
      discount: "31% OFF",
      image: "https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=COVID+Test",
      features: ["Home Collection", "6 Hours Report", "ICMR Approved"]
    }
  ];

  return (
    <section className="lab-tests">
      <div className="container">
        <div className="lab-tests-header">
          <h2>Lab Tests & Health Packages</h2>
          <p>Get accurate diagnostics with home collection and quick reports</p>
          <Link to="/medicines" className="view-all-btn">View All Tests</Link>
        </div>
        <div className="lab-tests-grid">
          {labTests.map((test) => (
            <div key={test.id} className="lab-test-card">
              <div className="test-image">
                <img src={test.image} alt={test.title} />
                <div className="discount-badge">{test.discount}</div>
              </div>
              <div className="test-content">
                <h3>{test.title}</h3>
                <p className="test-description">{test.description}</p>
                <div className="test-features">
                  {test.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="test-pricing">
                  <div className="price-info">
                    <span className="current-price">{test.price}</span>
                    <span className="original-price">{test.originalPrice}</span>
                  </div>
                  <button className="book-test-btn">Book Test</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lab-tests-cta">
          <div className="cta-content">
            <h3>Why Choose Our Lab Services?</h3>
            <div className="cta-features">
              <div className="cta-feature">
                <span className="cta-icon">🏠</span>
                <span>Home Collection</span>
              </div>
              <div className="cta-feature">
                <span className="cta-icon">⚡</span>
                <span>Quick Reports</span>
              </div>
              <div className="cta-feature">
                <span className="cta-icon">🩺</span>
                <span>Certified Labs</span>
              </div>
              <div className="cta-feature">
                <span className="cta-icon">📱</span>
                <span>Online Reports</span>
              </div>
            </div>
            <Link to="/medicines" className="cta-btn">Explore All Tests</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LabTests;
