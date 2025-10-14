import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const cities = [
    { name: "Bangalore", pincode: "560001" },
    { name: "Mysore", pincode: "570001" },
    { name: "Mangalore", pincode: "575001" },
    { name: "Hubli", pincode: "580001" },
    { name: "Belgaum", pincode: "590001" },
    { name: "Gulbarga", pincode: "585101" },
    { name: "Davangere", pincode: "577001" },
    { name: "Bellary", pincode: "583101" },
    { name: "Bijapur", pincode: "586101" },
    { name: "Shimoga", pincode: "577201" },
    { name: "Delhi", pincode: "110001" },
    { name: "Mumbai", pincode: "400001" },
    { name: "Chennai", pincode: "600001" },
    { name: "Pune", pincode: "411001" },
    { name: "Kolkata", pincode: "700001" },
    { name: "Hyderabad", pincode: "500001" },
    { name: "Ahmedabad", pincode: "380001" },
    { name: "Jaipur", pincode: "302001" },
  ];

  return (
    <div className="search-bar">
      <h2>What are you looking for?</h2>
      <select value={selectedCity} onChange={handleCityChange} className="city-select">
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} - {city.pincode}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search for medicine, health products..."
        value={query}
        onChange={handleSearch}
      />
      <button onClick={() => { if(selectedCity) navigate(`/medical-store/${selectedCity}`); }}>Search</button>
    </div>
  );
}

export default SearchBar;
