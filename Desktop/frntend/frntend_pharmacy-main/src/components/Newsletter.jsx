import React, { useState } from "react";
import "../styles/Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Stay Healthy with Latest Updates</h2>
            <p>Subscribe to our newsletter for health tips, exclusive offers, and medicine reminders</p>
            <ul className="newsletter-benefits">
              <li>💊 Weekly medicine reminders</li>
              <li>🏷️ Exclusive discounts & offers</li>
              <li>📚 Health tips from experts</li>
              <li>🔔 New product launches</li>
            </ul>
          </div>
          <div className="newsletter-form">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe Now
                  </button>
                </div>
                <p className="privacy-note">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Thank you for subscribing!</h3>
                <p>You'll receive our latest updates soon.</p>
              </div>
            )}
          </div>
        </div>
        <div className="newsletter-stats">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Subscribers</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>Health Tips Shared</p>
          </div>
          <div className="stat-item">
            <h3>₹2L+</h3>
            <p>Savings Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
