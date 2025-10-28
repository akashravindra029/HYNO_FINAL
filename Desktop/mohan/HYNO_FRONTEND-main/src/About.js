import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaUsers, FaAward, FaShieldAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { icon: <FaUsers />, number: '50,000+', label: 'Happy Customers' },
    { icon: <FaHeartbeat />, number: '10,000+', label: 'Medicines Delivered' },
    { icon: <FaAward />, number: '5 Years', label: 'Of Excellence' },
    { icon: <FaShieldAlt />, number: '100%', label: 'Quality Assured' }
  ];

  const values = [
    {
      icon: <FaHeartbeat />,
      title: 'Health First',
      description: 'Your health and well-being are our top priorities. We ensure every product meets the highest safety standards.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Quality Assurance',
      description: 'All our medicines are sourced from certified manufacturers and undergo rigorous quality checks.'
    },
    {
      icon: <FaClock />,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service to get your medicines when you need them most.'
    },
    {
      icon: <FaUsers />,
      title: 'Expert Support',
      description: 'Our certified pharmacists are available 24/7 to provide professional medical advice and guidance.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Pharmacist',
      image: 'https://via.placeholder.com/150x150/667eea/ffffff?text=SJ',
      bio: 'Over 15 years of experience in pharmaceutical care and patient counseling.'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Medical Director',
      image: 'https://via.placeholder.com/150x150/27ae60/ffffff?text=MC',
      bio: 'Board-certified physician specializing in internal medicine and preventive care.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Care Manager',
      image: 'https://via.placeholder.com/150x150/e74c3c/ffffff?text=ER',
      bio: 'Dedicated to ensuring exceptional customer service and satisfaction.'
    }
  ];

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>About Hypno Pharmacy</h1>
          <p>Your trusted partner in health and wellness since 2019</p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div
            className="mission-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Mission</h2>
            <p>
              At Hypno Pharmacy, we are committed to providing accessible, affordable, and high-quality
              healthcare solutions to our community. We believe that everyone deserves access to the
              medications and healthcare products they need to live healthy, fulfilling lives.
            </p>
            <p>
              Through our online platform, we bridge the gap between patients and quality healthcare,
              ensuring that geographical barriers never stand in the way of good health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>

          <motion.div
            className="values-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>

          <motion.div
            className="team-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Get In Touch</h2>
            <p>Have questions about our services? We're here to help!</p>

            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <h4>Address</h4>
                  <p>123 Health Street, Medical District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="contact-item">
                <FaClock />
                <div>
                  <h4>Hours</h4>
                  <p>Mon-Fri: 9AM-9PM<br />Sat-Sun: 10AM-6PM</p>
                </div>
              </div>

              <div className="contact-item">
                <FaUsers />
                <div>
                  <h4>Support</h4>
                  <p>24/7 Customer Care<br />support@hypnopharmacy.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
