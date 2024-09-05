// PromptModal.js
import React, { useState } from 'react';
import './PromptModal.css';

function PromptModal({ isOpen, onClose, onSubmit }) {
  const [inputId, setInputId] = useState('');

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleSubmit = () => {
    if (inputId.trim() === '') {
      alert('Please enter a valid Aarogya ID.');
      return;
    }
    onSubmit(inputId);
    setInputId('');
    onClose(); // Close modal after submission
  };

  // Handle modal close
  const handleClose = () => {
    setInputId('');      // Clear the input box when closing
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Aarogya ID</h2>
        <input
          type="text"
          value={inputId}
          onChange={handleInputChange}
          placeholder="Enter Aarogya ID"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PromptModal;
