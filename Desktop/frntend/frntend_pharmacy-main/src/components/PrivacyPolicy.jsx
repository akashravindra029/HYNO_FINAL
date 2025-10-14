import React from "react";
import "../styles/AboutUs.css"; // Reuse styles for simplicity

function PrivacyPolicy() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>Privacy Policy</h1>
        <p>How we protect your personal information.</p>
      </div>
      <div className="about-content">
        <section className="mission">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            This may include your name, email address, phone number, and payment information.
          </p>
        </section>
        <section className="history">
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to process orders, provide customer service, send you marketing communications (with your consent),
            and improve our services. We do not sell your personal information to third parties.
          </p>
        </section>
        <section className="team">
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>
        <section className="values">
          <h2>Your Rights</h2>
          <ul>
            <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
            <li><strong>Correction:</strong> You can update or correct your information.</li>
            <li><strong>Deletion:</strong> You can request deletion of your personal information.</li>
            <li><strong>Opt-out:</strong> You can unsubscribe from marketing communications at any time.</li>
          </ul>
        </section>
        <section className="contact">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@hynopharmacy.com.</p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
