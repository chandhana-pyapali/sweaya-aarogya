import React, { useState } from 'react';
import UserForm from './components/UserForm';
import DetailsDisplay from './components/DetailsDisplay';
import Header from './components/Header';
import './App.css'; // Add global styles if needed

function App() {
  const [view, setView] = useState('home'); // Controls the displayed component
  const [aarogyaId, setAarogyaId] = useState(null); // Holds the Aarogya ID
  const [formData, setFormData] = useState(null); // Temporarily holds form data

  // Handle successful form submission
  const handleFormSubmit = (data, id) => {
    setFormData(data);
    setAarogyaId(id);
    setView('details'); // Reset to home after displaying the success message
    alert(`Successfully saved beneficiary details with Aarogya ID: ${id}`);
  };

  // Reset state and navigate to 'details' view
  const handleShowDetails = () => {
    setView('details');
  };

  // Erase data and reset to 'home' view
  const handleReset = () => {
    setView('home');
    setAarogyaId(null);
    setFormData(null);
  };

  return (
    <div className="main-container">
      <Header /> {/* Include the Header component */}
      {view === 'home' && (
        <div className="home-buttons">
          <button onClick={() => setView('register')}>Register Beneficiary</button>
          <button onClick={handleShowDetails}>Display Beneficiary Details</button>
        </div>
      )}
      {view === 'register' && (
        <UserForm onSubmit={handleFormSubmit} onReset={handleReset}/>
      )}
      {view === 'details' && (
        <DetailsDisplay
          formData={formData}
          aarogyaId={aarogyaId}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
