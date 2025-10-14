import React from "react";
import "../styles/FAQs.css";

function FAQs() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by browsing our products, adding them to your cart, and proceeding to checkout."
    },
    {
      question: "What are your delivery options?",
      answer: "We offer standard delivery within 3-5 business days and express delivery within 1-2 business days."
    },
    {
      question: "Do you require a prescription for all medicines?",
      answer: "Yes, prescription medicines require a valid prescription. Over-the-counter products do not."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email to monitor your delivery."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase for unopened products. Please contact customer service for assistance."
    }
  ];

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
