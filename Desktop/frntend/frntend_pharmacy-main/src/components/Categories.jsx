import React from "react";
import { Link } from "react-router-dom";
import "../styles/Categories.css";

function Categories() {
  const categories = [
    {
      name: "Medicines",
      icon: "💊",
      image: "images/8418259.jpg",
      description: "Over-the-counter and prescription medicines",
      link: "/medicines"
    },
    {
      name: "Health & Nutrition",
      icon: "🧬",
      image: "images/vitamin-category.jpeg",
      description: "Vitamins, supplements, and nutritional products",
      link: "/medicines"
    },
    {
      name: "Personal Care",
      icon: "🧴",
      image: "/images/pc-category.jpg",
      description: "Skincare, haircare, and hygiene products",
      link: "/medicines"
    },
    {
      name: "Baby Care",
      icon: "👶",
      image: "/images/babycare-category.jpg",
      description: "Diapers, baby food, and infant care products",
      link: "/medicines"
    }
  ];

  return (
    <section className="categories" id="categories">
      <div className="container">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="category-link">
              <div className="category-card">
                <div className="category-icon">{category.icon}</div>
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="explore-btn">
                  <span>Explore</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
