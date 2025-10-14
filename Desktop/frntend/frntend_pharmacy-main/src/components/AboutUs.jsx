import React from "react";
import "../styles/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Hyno Pharmacy</h1>
        <p>Your trusted partner in health and wellness.</p>
      </div>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At Hyno Pharmacy, our mission is to provide accessible, affordable, and high-quality healthcare solutions to our community.
            We are committed to delivering medicines and health products with integrity, ensuring the well-being of every customer.
          </p>
        </section>
        <section className="history">
          <h2>Our History</h2>
          <p>
            Founded in 2020, Hyno Pharmacy started as a small local store with a vision to revolutionize online pharmacy services.
            Over the years, we have grown into a trusted online platform, serving thousands of customers nationwide with fast and reliable delivery.
          </p>
        </section>
        <section className="team">
          <h2>Our Team</h2>
          <p>
            Our dedicated team of pharmacists, healthcare professionals, and customer service experts work tirelessly to ensure that you receive
            the best care possible. We prioritize safety, accuracy, and personalized service in everything we do.
          </p>
        </section>
        <section className="values">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We source only the highest quality medicines and products.</li>
            <li><strong>Trust:</strong> Building long-term relationships through transparency and reliability.</li>
            <li><strong>Innovation:</strong> Embracing technology to improve healthcare accessibility.</li>
            <li><strong>Community:</strong> Supporting local health initiatives and customer education.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
