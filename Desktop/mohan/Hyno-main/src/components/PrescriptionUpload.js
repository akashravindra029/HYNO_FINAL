import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt, FaFileAlt, FaTimes, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const PrescriptionUpload = ({ onUpload, onClose, existingPrescriptions = [] }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    const errors = [];

    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid file type. Only JPG, PNG, GIF, and PDF files are allowed.`);
    }

    if (file.size > maxFileSize) {
      errors.push(`${file.name}: File size exceeds 10MB limit.`);
    }

    return errors;
  };

  const processFiles = (files) => {
    const newFiles = Array.from(files);
    const validFiles = [];
    const fileErrors = [];

    newFiles.forEach(file => {
      const validationErrors = validateFile(file);
      if (validationErrors.length > 0) {
        fileErrors.push(...validationErrors);
      } else {
        validFiles.push({
          file,
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          status: 'pending'
        });
      }
    });

    setErrors(fileErrors);
    setUploadedFiles(prev => [...prev, ...validFiles]);

    // Auto-upload valid files
    validFiles.forEach(fileData => {
      uploadFile(fileData);
    });
  };

  const uploadFile = async (fileData) => {
    setUploadProgress(prev => ({ ...prev, [fileData.id]: 0 }));

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileData.id] || 0;
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          setUploadedFiles(files =>
            files.map(f =>
              f.id === fileData.id
                ? { ...f, status: 'completed' }
                : f
            )
          );
          return { ...prev, [fileData.id]: 100 };
        }
        return { ...prev, [fileData.id]: currentProgress + 10 };
      });
    }, 200);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleSubmit = () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    if (completedFiles.length > 0) {
      onUpload(completedFiles);
      onClose();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload Prescription</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Drag & drop your prescription here
            </h3>
            <p className="text-gray-500 mb-4">
              or <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: JPG, PNG, GIF, PDF (Max 10MB each)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.gif,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center mb-2">
                <FaExclamationTriangle className="text-red-500 mr-2" />
                <span className="font-medium text-red-800">Upload Errors</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Uploaded Files</h4>
              <div className="space-y-3">
                {uploadedFiles.map((fileData) => (
                  <div
                    key={fileData.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {fileData.preview ? (
                        <img
                          src={fileData.preview}
                          alt={fileData.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <FaFileAlt className="text-gray-400 text-xl" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{fileData.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(fileData.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {fileData.status === 'completed' ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : fileData.status === 'uploading' ? (
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}

                      {uploadProgress[fileData.id] !== undefined && uploadProgress[fileData.id] < 100 && (
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[fileData.id]}%` }}
                          ></div>
                        </div>
                      )}

                      <button
                        onClick={() => removeFile(fileData.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Prescriptions */}
          {existingPrescriptions.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Previous Prescriptions</h4>
              <div className="space-y-2">
                {existingPrescriptions.map((prescription, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FaFileAlt className="text-blue-500" />
                      <span className="text-sm text-gray-700">{prescription.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">Uploaded {prescription.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploadedFiles.filter(f => f.status === 'completed').length === 0}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Upload & Continue
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrescriptionUpload;
