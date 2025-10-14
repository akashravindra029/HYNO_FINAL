import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PatientForm.css';

function PatientForm() {
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    email: '',
    phone: '',
    gender: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Patient ID: ${formData.patientId}\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGender: ${formData.gender}`);
    // Reset form
    setFormData({
      patientId: '',
      name: '',
      email: '',
      phone: '',
      gender: ''
    });
    // Redirect to prescription page
    navigate('/prescription');
  };

  return (
    <div className="patient-form-container">
      <h2>Patient Information Form</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientId">🆔 Patient ID:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">👤 Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">📧 Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">📞 Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="gender">⚥ Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;