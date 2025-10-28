import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logo.png"; // ✅ Your logo path

const LandingPage = () => {
  // 🟣 Advertisement Carousel
  const ads = [
    { img: "/banners/offer1.jpg", text: "💊 Flat 25% Off on All Medicines!" },
    { img: "/banners/offer2.jpg", text: "⚡ Buy 1 Get 1 Free on Vitamins!" },
    { img: "/banners/offer3.jpg", text: "👶 Up to 50% Off on Baby Care Products!" },
    { img: "/banners/offer4.jpg", text: "🚚 Free Delivery on Orders Above ₹499!" },
    { img: "/banners/offer5.jpg", text: "🎁 Get Extra 10% Cashback with Hyno Wallet!" },
  ];

  const [currentAd, setCurrentAd] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ads.length]);

  // 💬 Floating Comments
  const [floatingComments, setFloatingComments] = useState([
    { name: "Amit Sharma", text: "Got my medicines in 2 hours! 🚚" },
    { name: "Priya Verma", text: "Loved the cashback offer 💰 Highly recommended!" },
    { name: "Rahul Joshi", text: "Smooth checkout and genuine medicines 💊" },
    { name: "Sneha Patil", text: "Customer support was super helpful 👍" },
  ]);

  const [currentFloating, setCurrentFloating] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFloating(Math.floor(Math.random() * floatingComments.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [floatingComments.length]);

  // 🟢 Recommended Products
  const recommendedProducts = [
    { name: "Paracetamol 500mg", price: "₹49", img: "/products/paracetamol.jpg" },
    { name: "Dabur Honey 250g", price: "₹99", img: "/products/honey.jpg" },
    { name: "Revital H Capsules", price: "₹199", img: "/products/revital.jpg" },
    { name: "Himalaya Baby Lotion", price: "₹149", img: "/products/babylotion.jpg" },
    { name: "Dettol Antiseptic Liquid 250ml", price: "₹85", img: "/products/dettol.jpg" },
    { name: "Vicks Vaporub 50ml", price: "₹95", img: "/products/vicks.jpg" },
    { name: "Horlicks Health Drink 500g", price: "₹220", img: "/products/horlicks.jpg" },
    { name: "Moov Pain Relief Spray 80g", price: "₹130", img: "/products/moov.jpg" },
    { name: "Cetrizine Allergy Tablets", price: "₹35", img: "/products/cetrizine.jpg" },
    { name: "Savlon Handwash 750ml", price: "₹99", img: "/products/savlon.jpg" },
    { name: "Bournvita Nutrition Drink 500g", price: "₹240", img: "/products/bournvita.jpg" },
    { name: "Lactulose Syrup 200ml", price: "₹160", img: "/products/lactulose.jpg" },
    { name: "Benadryl Cough Syrup 150ml", price: "₹120", img: "/products/benadryl.jpg" },
    { name: "Johnson’s Baby Soap 75g", price: "₹85", img: "/products/babysoap.jpg" },
    { name: "ProteinX Chocolate Flavour 500g", price: "₹640", img: "/products/proteinex.jpg" },
    { name: "Zincovit Tablets", price: "₹130", img: "/products/zincovit.jpg" },
    { name: "Evion 400 (Vitamin E)", price: "₹95", img: "/products/evion.jpg" },
    { name: "Amoxicillin 500mg", price: "₹90", img: "/products/amoxicillin.jpg" },

  ];

  // ✍️ User Comment Form
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && userComment) {
      setFloatingComments([...floatingComments, { name: userName, text: userComment }]);
      setUserName("");
      setUserComment("");
      alert("✅ Thank you! Your comment has been added.");
    }
  };

  // 🤖 AI Chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", text: "👋 Hi! I'm Hyno AI. Tell me your symptom, and I'll suggest a medicine or syrup." },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMsg = { sender: "user", text: userInput };
    setChatMessages((prev) => [...prev, newUserMsg]);

    const lower = userInput.toLowerCase();
    let reply = "I'm not sure about that. Please consult a doctor 👨‍⚕️.";

    if (lower.includes("fever"))
      reply = "You can take Paracetamol 500mg 💊 and stay hydrated. If fever persists, consult a doctor.";
    else if (lower.includes("cold"))
      reply = "Try Cetrizine or Dabur Honitus syrup 🤧. Also, drink warm water.";
    else if (lower.includes("cough"))
      reply = "Benadryl or Ascoril syrup 💧 helps. Avoid cold drinks!";
    else if (lower.includes("pain"))
      reply = "Moov or Volini spray 💪 can relieve muscle pain.";
    else if (lower.includes("headache"))
      reply = "Take Paracetamol or rest in a quiet place 💤.";
    else if (lower.includes("stomach"))
      reply = "Try Eno or Digene after meals 🍽️ for relief.";
    else if (lower.includes("allergy"))
      reply = "Cetrizine tablets 💊 work for mild allergies.";

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 700);

    setUserInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="landing-page"
    >
      {/* 🟢 NAVBAR (Untouched) */}
      <header className="navbar">
        <nav>
          <div className="navbar-left">
            <img src={logo} alt="HynoPharma Logo" className="logo" />
          </div>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/products">Medicines</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* 🟢 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Trusted Online Pharmacy at Your Fingertips</h1>
          <p>Order medicines, book health tests, and consult doctors — all from the comfort of your home.</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for medicines, health products..." />
            <button>🔍</button>
          </div>
          <Link to="/products">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shop-now-btn">
              Shop Now
            </motion.button>
          </Link>
        </div>
      </section>

      {/* 🟣 ADVERTISEMENT CAROUSEL */}
      <section className="advertisement-section">
        <motion.div
          key={currentAd}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="advertisement-card"
        >
          <img src={ads[currentAd].img} alt="Ad" />
          <p>{ads[currentAd].text}</p>
        </motion.div>
      </section>

      {/* 🟢 SERVICES */}
      <section className="services-section">
        <h2>Why Choose HynoPharma?</h2>
        <div className="services-grid">
          {[
            { icon: "🚚", title: "Super Fast Delivery", text: "Get medicines delivered within 2 hours." },
            { icon: "💊", title: "Genuine Medicines", text: "100% verified and quality-checked products." },
            { icon: "🧾", title: "Easy Prescription Upload", text: "Upload and we’ll assist you instantly." },
            { icon: "💬", title: "Doctor Consultation", text: "Chat with certified doctors anytime." },
          ].map((card, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="service-card">
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔵 RECOMMENDED PRODUCTS */}
      <section className="recommended-section">
        <h2>Recommended for You</h2>
        <div className="recommended-grid">
          {recommendedProducts.map((product, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="product-card">
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 HEALTH TIPS */}
      <section className="health-tips">
        <h2>🩺 Health Tips</h2>
        <div className="tips-grid">
          <div>Stay hydrated — drink 2L water daily 💧</div>
          <div>Do light exercise 30 mins a day 🏃‍♂️</div>
          <div>Don't skip breakfast 🍎</div>
        </div>
      </section>

      {/* 🟢 FOOTER */}
      <footer className="footer">
        <h3>HynoPharma</h3>
        <p>Your trusted partner for quality healthcare products.</p>
        <p className="copyright">© 2025 HynoPharma. All Rights Reserved.</p>
      </footer>

      {/* 🤖 AI CHATBOT (Side Popup) */}
      <div className="chatbot-icon" onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </div>

      {isChatOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Hyno AI Assistant 🤖</h4>
            <button onClick={() => setIsChatOpen(false)}>✖</button>
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                <strong>{msg.sender === "user" ? "You:" : "Hyno AI:"}</strong> {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chatbot-input">
            <input
              type="text"
              placeholder="Type your symptom..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default LandingPage;
