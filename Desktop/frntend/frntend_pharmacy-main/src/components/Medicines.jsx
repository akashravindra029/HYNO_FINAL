
import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import '../styles/Medicines.css';

function Medicines() {
  return (
    <div className="medicines-page">
      <h1>Medicines</h1>
      <CategoryDropdown />
    </div>
  );
}

export default Medicines;
