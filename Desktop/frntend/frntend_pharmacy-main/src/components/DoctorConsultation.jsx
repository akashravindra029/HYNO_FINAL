import React, { useState } from 'react';
import '../styles/DoctorConsultation.css';

function DoctorConsultation() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    symptoms: ''
  });

  const specialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'Dentistry',
    'Psychiatry'
  ];

  const doctors = {
    'General Medicine': [
      { id: 1, name: 'Dr. Sarah Johnson', experience: '15 years', rating: 4.8, fee: '$50', available: ['09:00', '10:00', '14:00', '15:00'] },
      { id: 2, name: 'Dr. Michael Chen', experience: '12 years', rating: 4.6, fee: '$45', available: ['11:00', '13:00', '16:00'] },
      { id: 3, name: 'Dr. Emily Davis', experience: '10 years', rating: 4.7, fee: '$48', available: ['10:30', '12:00', '15:30'] }
    ],
    'Cardiology': [
      { id: 4, name: 'Dr. Robert Wilson', experience: '20 years', rating: 4.9, fee: '$80', available: ['09:00', '11:00', '14:00'] },
      { id: 5, name: 'Dr. Lisa Anderson', experience: '18 years', rating: 4.8, fee: '$75', available: ['10:00', '13:00', '16:00'] }
    ],
    'Dermatology': [
      { id: 6, name: 'Dr. Jennifer Lee', experience: '14 years', rating: 4.7, fee: '$60', available: ['09:30', '11:30', '14:30'] },
      { id: 7, name: 'Dr. David Kumar', experience: '11 years', rating: 4.5, fee: '$55', available: ['10:30', '13:30', '15:30'] }
    ],
    'Pediatrics': [
      { id: 8, name: 'Dr. Maria Garcia', experience: '16 years', rating: 4.8, fee: '$55', available: ['09:00', '10:00', '11:00', '14:00'] },
      { id: 9, name: 'Dr. James Brown', experience: '13 years', rating: 4.6, fee: '$50', available: ['12:00', '15:00', '16:00'] }
    ],
    'Orthopedics': [
      { id: 10, name: 'Dr. Kevin Patel', experience: '17 years', rating: 4.7, fee: '$70', available: ['09:00', '11:00', '14:00'] },
      { id: 11, name: 'Dr. Rachel Green', experience: '15 years', rating: 4.6, fee: '$65', available: ['10:00', '13:00', '16:00'] }
    ],
    'Gynecology': [
      { id: 12, name: 'Dr. Amanda White', experience: '19 years', rating: 4.8, fee: '$65', available: ['09:30', '11:30', '14:30'] },
      { id: 13, name: 'Dr. Sophia Martinez', experience: '16 years', rating: 4.7, fee: '$60', available: ['10:30', '13:30', '15:30'] }
    ],
    'Dentistry': [
      { id: 14, name: 'Dr. Thomas Taylor', experience: '12 years', rating: 4.5, fee: '$40', available: ['09:00', '10:00', '11:00', '14:00'] },
      { id: 15, name: 'Dr. Olivia Johnson', experience: '10 years', rating: 4.4, fee: '$38', available: ['12:00', '15:00', '16:00'] }
    ],
    'Psychiatry': [
      { id: 16, name: 'Dr. William Davis', experience: '22 years', rating: 4.9, fee: '$90', available: ['10:00', '13:00', '16:00'] },
      { id: 17, name: 'Dr. Emma Wilson', experience: '18 years', rating: 4.7, fee: '$85', available: ['09:00', '11:00', '14:00'] }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    // Reset form
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      symptoms: ''
    });
    setSelectedDoctor(null);
    setSelectedSpecialty('');
  };

  return (
    <div className="consultation-container fade-in">
      <h2>Book a Doctor Consultation</h2>

      {!selectedSpecialty ? (
        <div className="specialty-selection">
          <h3>Select Specialty</h3>
          <div className="specialty-grid">
            {specialties.map(specialty => (
              <button
                key={specialty}
                className="specialty-btn"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      ) : !selectedDoctor ? (
        <div className="doctor-selection">
          <button
            className="back-btn"
            onClick={() => setSelectedSpecialty('')}
          >
            ← Back to Specialties
          </button>
          <h3>Select a Doctor - {selectedSpecialty}</h3>
          <div className="doctor-grid">
            {doctors[selectedSpecialty]?.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-info">
                  <h4>{doctor.name}</h4>
                  <p className="experience">{doctor.experience} experience</p>
                  <div className="rating">
                    <span>⭐ {doctor.rating}</span>
                  </div>
                  <p className="fee">Consultation Fee: {doctor.fee}</p>
                </div>
                <div className="doctor-actions">
                  <button
                    className="book-btn"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="booking-form">
          <button
            className="back-btn"
            onClick={() => setSelectedDoctor(null)}
          >
            ← Back to Doctors
          </button>
          <h3>Book Appointment with {selectedDoctor.name}</h3>

          <div className="doctor-summary">
            <p><strong>Specialty:</strong> {selectedSpecialty}</p>
            <p><strong>Experience:</strong> {selectedDoctor.experience}</p>
            <p><strong>Rating:</strong> ⭐ {selectedDoctor.rating}</p>
            <p><strong>Fee:</strong> {selectedDoctor.fee}</p>
          </div>

          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={bookingForm.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={bookingForm.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={bookingForm.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={bookingForm.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Preferred Time</label>
              <select
                id="time"
                name="time"
                value={bookingForm.time}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Time</option>
                {selectedDoctor.available.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="symptoms">Symptoms/Reason for Visit</label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={bookingForm.symptoms}
                onChange={handleInputChange}
                rows="4"
                placeholder="Please describe your symptoms or reason for consultation..."
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Confirm Booking - {selectedDoctor.fee}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DoctorConsultation;
