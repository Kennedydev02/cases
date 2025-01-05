import React, { useState } from 'react';
import { 
  FiX, 
  FiUpload, 
  FiFile, 
  FiDownload, 
  FiTrash2, 
  FiPaperclip,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function ManageDocumentsModal({ client, onClose }) {
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'Work Permit.pdf', 
      type: 'application/pdf', 
      date: '2024-02-29',
      size: '2.4 MB',
      status: 'verified'
    },
    { 
      id: 2, 
      name: 'ID Card.jpg', 
      type: 'image/jpeg', 
      date: '2024-02-29',
      size: '1.1 MB',
      status: 'pending'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        date: new Date().toISOString().split('T')[0],
        size: formatFileSize(file.size),
        status: 'pending'
      };
      setDocuments(prev => [...prev, newDoc]);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      style={styles.overlay}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        style={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        <div style={styles.header}>
          <h2 style={styles.title}>
            <FiPaperclip style={styles.titleIcon} /> Manage Documents
          </h2>
          <button onClick={onClose} style={styles.closeButton}>
            <FiX size={24} />
          </button>
        </div>

        <div
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : {})
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            style={styles.fileInput}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <FiUpload size={24} style={styles.uploadIcon} />
          <p style={styles.dropzoneText}>
            Drag and drop files here or <label htmlFor="file-upload" style={styles.browseButton}>browse</label>
          </p>
          <p style={styles.dropzoneSubtext}>
            Supported files: PDF, JPG, PNG, DOC
          </p>
        </div>

        <div style={styles.documentList}>
          {documents.map(doc => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={styles.documentItem}
            >
              <div style={styles.documentInfo}>
                <div style={styles.documentIcon}>
                  <FiFile size={20} />
                </div>
                <div style={styles.documentDetails}>
                  <span style={styles.documentName}>{doc.name}</span>
                  <span style={styles.documentMeta}>
                    {doc.size} • {doc.date}
                  </span>
                </div>
                <div style={styles.documentStatus}>
                  {doc.status === 'verified' ? (
                    <span style={styles.statusVerified}>
                      <FiCheck size={14} /> Verified
                    </span>
                  ) : (
                    <span style={styles.statusPending}>
                      <FiAlertCircle size={14} /> Pending
                    </span>
                  )}
                </div>
              </div>
              <div style={styles.documentActions}>
                <button style={styles.actionButton} title="Download">
                  <FiDownload size={18} />
                </button>
                <button 
                  style={styles.actionButton} 
                  onClick={() => handleDelete(doc.id)}
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  titleIcon: {
    color: '#6B7280',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  dropzone: {
    border: '2px dashed #E5E7EB',
    borderRadius: '0.75rem',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#F9FAFB',
    transition: 'all 0.2s',
    marginBottom: '2rem',
    cursor: 'pointer',
  },
  dropzoneActive: {
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
  },
  fileInput: {
    display: 'none',
  },
  uploadIcon: {
    color: '#6B7280',
    marginBottom: '1rem',
  },
  dropzoneText: {
    margin: '0.5rem 0',
    color: '#374151',
    fontSize: '0.875rem',
  },
  dropzoneSubtext: {
    color: '#6B7280',
    fontSize: '0.75rem',
  },
  browseButton: {
    color: '#2563EB',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  documentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  documentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  documentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  documentIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#E5E7EB',
    borderRadius: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6B7280',
  },
  documentDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  documentName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#111827',
  },
  documentMeta: {
    fontSize: '0.75rem',
    color: '#6B7280',
  },
  documentStatus: {
    marginLeft: 'auto',
    paddingRight: '1rem',
  },
  statusVerified: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    color: '#059669',
    backgroundColor: '#D1FAE5',
    padding: '0.25rem 0.5rem',
    borderRadius: '1rem',
  },
  statusPending: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    padding: '0.25rem 0.5rem',
    borderRadius: '1rem',
  },
  documentActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    padding: '0.5rem',
    backgroundColor: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: '0.375rem',
    color: '#6B7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#F3F4F6',
      color: '#111827',
    },
  },
};

export default ManageDocumentsModal;