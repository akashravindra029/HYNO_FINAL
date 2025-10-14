import React from "react";
import "../styles/Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Excellent service! Got my medicines delivered within 2 hours. The quality is top-notch and prices are reasonable. Highly recommend!",
      avatar: "https://via.placeholder.com/60x60/FF6B6B/FFFFFF?text=PS"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "The online consultation feature is amazing. Doctor was very professional and prescribed the right medicines. Fast delivery too!",
      avatar: "https://via.placeholder.com/60x60/4ECDC4/FFFFFF?text=RK"
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Ahmedabad",
      rating: 5,
      text: "Great experience with the lab tests. Home collection was convenient and reports were accurate. Will definitely use again.",
      avatar: "https://via.placeholder.com/60x60/45B7D1/FFFFFF?text=AP"
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Bangalore",
      rating: 5,
      text: "Trustworthy pharmacy with genuine medicines. The app is user-friendly and customer support is excellent.",
      avatar: "https://via.placeholder.com/60x60/F9CA24/FFFFFF?text=VS"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <p className="testimonials-subtitle">Trusted by thousands of satisfied customers across India</p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p className="location">{testimonial.location}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
        <div className="testimonials-stats">
          <div className="stat">
            <h3>500K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>4.8/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat">
            <h3>99%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
