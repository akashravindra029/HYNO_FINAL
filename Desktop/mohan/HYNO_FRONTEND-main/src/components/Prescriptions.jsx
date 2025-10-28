import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileMedical, FaDownload, FaEye, FaPlus, FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import './Prescriptions.css';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    // Mock data - in real app, this would come from an API
    const mockPrescriptions = [
      {
        id: 1,
        prescriptionNumber: 'RX-2024-001',
        date: '2024-01-15',
        doctor: 'Dr. Sarah Johnson',
        medications: [
          { name: 'Amoxicillin 500mg', dosage: '500mg three times daily', duration: '7 days' },
          { name: 'Ibuprofen 200mg', dosage: '200mg as needed', duration: 'As needed for pain' }
        ],
        status: 'active',
        notes: 'Take with food. Complete full course.'
      },
      {
        id: 2,
        prescriptionNumber: 'RX-2024-002',
        date: '2024-01-10',
        doctor: 'Dr. Michael Chen',
        medications: [
          { name: 'Cetirizine 10mg', dosage: '10mg once daily', duration: '30 days' }
        ],
        status: 'active',
        notes: 'For allergy relief.'
      },
      {
        id: 3,
        prescriptionNumber: 'RX-2023-045',
        date: '2023-12-20',
        doctor: 'Dr. Emily Davis',
        medications: [
          { name: 'Paracetamol 500mg', dosage: '500mg as needed', duration: 'Expired' }
        ],
        status: 'expired',
        notes: 'Expired prescription.'
      }
    ];
    setPrescriptions(mockPrescriptions);
  }, []);

  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (activeTab === 'active') return prescription.status === 'active';
    if (activeTab === 'expired') return prescription.status === 'expired';
    return true;
  });

  const handleDownload = (prescriptionId) => {
    // In real app, this would download the prescription PDF
    alert(`Downloading prescription ${prescriptionId}`);
  };

  const handleViewDetails = (prescription) => {
    // In real app, this would open a detailed view modal
    alert(`Viewing details for prescription ${prescription.prescriptionNumber}`);
  };

  const handleUploadPrescription = () => {
    // In real app, this would handle file upload
    alert('Prescription upload functionality would be implemented here');
    setShowUploadForm(false);
  };

  return (
    <motion.div
      className="prescriptions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prescriptions-header">
        <h1>My Prescriptions</h1>
        <p>Manage and track your medical prescriptions</p>
      </div>

      <motion.div
        className="prescriptions-controls"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Prescriptions
          </button>
          <button
            className={`tab ${activeTab === 'expired' ? 'active' : ''}`}
            onClick={() => setActiveTab('expired')}
          >
            Expired Prescriptions
          </button>
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Prescriptions
          </button>
        </div>

        <motion.button
          className="btn btn-primary"
          onClick={() => setShowUploadForm(!showUploadForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> Upload Prescription
        </motion.button>
      </motion.div>

      {showUploadForm && (
        <motion.div
          className="upload-form"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h3>Upload New Prescription</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUploadPrescription(); }}>
            <div className="form-group">
              <label>Prescription Image/PDF</label>
              <input type="file" accept="image/*,.pdf" required />
            </div>
            <div className="form-group">
              <label>Doctor's Name</label>
              <input type="text" placeholder="Dr. John Smith" required />
            </div>
            <div className="form-group">
              <label>Prescription Date</label>
              <input type="date" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Upload</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowUploadForm(false)}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="prescriptions-list">
        {filteredPrescriptions.map((prescription, index) => (
          <motion.div
            key={prescription.id}
            className="prescription-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div className="prescription-header">
              <div className="prescription-info">
                <h3>{prescription.prescriptionNumber}</h3>
                <p className="prescription-date">
                  <FaCalendarAlt /> {new Date(prescription.date).toLocaleDateString()}
                </p>
                <p className="prescription-doctor">
                  <FaUserMd /> {prescription.doctor}
                </p>
              </div>
              <div className="prescription-status">
                <span className={`status ${prescription.status}`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="prescription-medications">
              <h4>Medications</h4>
              {prescription.medications.map((medication, medIndex) => (
                <div key={medIndex} className="medication-item">
                  <strong>{medication.name}</strong>
                  <p>Dosage: {medication.dosage}</p>
                  <p>Duration: {medication.duration}</p>
                </div>
              ))}
            </div>

            {prescription.notes && (
              <div className="prescription-notes">
                <h4>Notes</h4>
                <p>{prescription.notes}</p>
              </div>
            )}

            <div className="prescription-actions">
              <motion.button
                className="btn btn-secondary"
                onClick={() => handleViewDetails(prescription)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEye /> View Details
              </motion.button>
              <motion.button
                className="btn btn-primary"
                onClick={() => handleDownload(prescription.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <motion.div
          className="no-prescriptions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaFileMedical className="no-prescriptions-icon" />
          <h3>No prescriptions found</h3>
          <p>You don't have any {activeTab} prescriptions.</p>
          {activeTab === 'active' && (
            <button className="btn btn-primary" onClick={() => setShowUploadForm(true)}>
              Upload Your First Prescription
            </button>
          )}
        </motion.div>
      )}

      <motion.div
        className="prescription-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2>Prescription Statistics</h2>
        <div className="stats-grid">
          <div className="stat">
            <h3>{prescriptions.filter(p => p.status === 'active').length}</h3>
            <p>Active Prescriptions</p>
          </div>
          <div className="stat">
            <h3>{prescriptions.filter(p => p.status === 'expired').length}</h3>
            <p>Expired Prescriptions</p>
          </div>
          <div className="stat">
            <h3>{prescriptions.length}</h3>
            <p>Total Prescriptions</p>
          </div>
          <div className="stat">
            <h3>{prescriptions.reduce((sum, p) => sum + p.medications.length, 0)}</h3>
            <p>Total Medications</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Prescriptions;
