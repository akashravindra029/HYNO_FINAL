import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../contexts/CartContext";
import "../styles/CategoryDropdown.css";

function CategoryDropdown() {
  const { addToCart } = useCart();

  const categories = useMemo(() => [
    {
      name: "Medicines",
      image: "images/8418259.jpg",
      description: "Over-the-counter and prescription medicines",
      medicines: [
        { name: "Paracetamol", price: "$5.99", description: "Pain reliever and fever reducer", brand: "Generic", strength: "500mg", packSize: "10 tablets" },
        { name: "Ibuprofen", price: "$7.49", description: "Anti-inflammatory pain reliever", brand: "Advil", strength: "200mg", packSize: "20 tablets" },
        { name: "Aspirin", price: "$4.99", description: "Pain reliever and blood thinner", brand: "Bayer", strength: "81mg", packSize: "30 tablets" },
        { name: "Amoxicillin", price: "$12.99", description: "Antibiotic for bacterial infections", brand: "Generic", strength: "500mg", packSize: "21 capsules" },
        { name: "Cetirizine", price: "$6.49", description: "Antihistamine for allergies", brand: "Zyrtec", strength: "10mg", packSize: "30 tablets" }
      ]
    },
    {
      name: "Health & Nutrition",
      image: "images/vitamin-category.jpeg",
      description: "Vitamins, supplements, and nutritional products",
      medicines: [
        { name: "Vitamin C", price: "$9.99", description: "Immune system support", brand: "Nature Made", strength: "1000mg", packSize: "60 tablets" },
        { name: "Multivitamin", price: "$12.99", description: "Daily vitamin supplement", brand: "Centrum", strength: "Adult", packSize: "100 tablets" },
        { name: "Omega-3", price: "$14.99", description: "Heart health supplement", brand: "Fish Oil", strength: "1000mg", packSize: "120 softgels" },
        { name: "Calcium + Vitamin D", price: "$11.49", description: "Bone health support", brand: "Generic", strength: "500mg/400IU", packSize: "90 tablets" },
        { name: "Probiotics", price: "$16.99", description: "Gut health supplement", brand: "Culturelle", strength: "10 billion CFU", packSize: "30 capsules" }
      ]
    },
    {
      name: "Personal Care",
      image: "/images/pc-category.jpg",
      description: "Skincare, haircare, and hygiene products",
      medicines: [
        { name: "Shampoo", price: "$8.99", description: "Hair cleansing product", brand: "Head & Shoulders", strength: "Anti-dandruff", packSize: "400ml" },
        { name: "Moisturizer", price: "$11.49", description: "Skin hydration cream", brand: "Cetaphil", strength: "Daily", packSize: "453g" },
        { name: "Toothpaste", price: "$3.99", description: "Oral hygiene product", brand: "Colgate", strength: "Total", packSize: "100g" },
        { name: "Face Wash", price: "$7.99", description: "Gentle facial cleanser", brand: "CeraVe", strength: "Hydrating", packSize: "236ml" },
        { name: "Sunscreen", price: "$13.99", description: "UV protection lotion", brand: "Neutrogena", strength: "SPF 50", packSize: "88ml" }
      ]
    },
    {
      name: "Baby Care",
      image: "/images/babycare-category.jpg",
      description: "Diapers, baby food, and infant care products",
      medicines: [
        { name: "Diapers", price: "$19.99", description: "Absorbent baby diapers", brand: "Pampers", strength: "Size 4", packSize: "44 count" },
        { name: "Baby Lotion", price: "$6.99", description: "Gentle baby skin care", brand: "Johnson's", strength: "Original", packSize: "200ml" },
        { name: "Baby Formula", price: "$24.99", description: "Infant nutrition", brand: "Similac", strength: "Stage 1", packSize: "1.45kg" },
        { name: "Baby Wipes", price: "$4.49", description: "Gentle baby cleansing wipes", brand: "Huggies", strength: "Unscented", packSize: "64 count" },
        { name: "Baby Shampoo", price: "$5.99", description: "Tear-free baby shampoo", brand: "Johnson's", strength: "Original", packSize: "200ml" }
      ]
    }
  ], []);

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      const exactMatch = categories.find(category =>
        category.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        setSelectedCategory(exactMatch);
        setIsOpen(false);
        setSearchTerm("");
      }
    }
  }, [searchTerm, categories]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMedicines = (medicines) => medicines;

  const handleSelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="category-dropdown">
      <div className="dropdown-header">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        <button onClick={() => setIsOpen(!isOpen)}>
          {selectedCategory ? selectedCategory.name : "Select Category"} ▼
        </button>
        {selectedCategory && (
          <button onClick={handleClear} style={{ marginLeft: '5px' }}>Clear</button>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(category)}
              >
                <img src={category.image} alt={category.name} />
                <div>
                  <h4>{category.name}</h4>
                  <p>{category.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No categories found</div>
          )}
        </div>
      )}
      <div className="medicines-list">
        {selectedCategory ? (
          <>
            <h3>{selectedCategory.name} Medicines</h3>
            <div className="medicines-grid">
              {getMedicines(selectedCategory.medicines).length > 0 ? (
                getMedicines(selectedCategory.medicines).map((medicine, index) => (
                  <div key={index} className="medicine-card">
                    <div className="medicine-header">
                      <h4>{medicine.name}</h4>
                      <span className="brand">{medicine.brand}</span>
                    </div>
                    <p className="description">{medicine.description}</p>
                    <div className="medicine-details">
                      <span className="detail">Strength: {medicine.strength}</span>
                      <span className="detail">Pack Size: {medicine.packSize}</span>
                    </div>
                    <div className="medicine-footer">
                      <span className="price">{medicine.price}</span>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(medicine)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">No medicines found</div>
              )}
            </div>
          </>
        ) : (
          <div className="no-results">Please select a category to see medicines.</div>
        )}
      </div>
    </div>
  );
}

export default CategoryDropdown;
