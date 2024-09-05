import React, { useState } from 'react';
import UserForm from './components/UserForm';
import DetailsDisplay from './components/DetailsDisplay';
import Header from './components/Header';
import PromptModal from './components/PromptModal';
import './App.css'; 

function App() {
  const [view, setView] = useState('home'); // Controls the displayed component
  const [aarogyaId, setAarogyaId] = useState(null); // Holds the Aarogya ID
  const [formData, setFormData] = useState(null); // Temporarily holds form data
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility

  // Handle successful form submission
  const handleFormSubmit = (data, id) => {
    setFormData(data);
    setAarogyaId(id);
    setView('details'); // Reset to home after displaying the success message
    alert(`Successfully saved beneficiary details with Aarogya ID: ${id}`);
  };

  // Reset state and navigate to 'details' view
  const handleShowDetails = () => {
    setIsModalOpen(true); // Open the modal when button is clicked
  };

  // Erase data and reset to 'home' view
  const handleReset = () => {
    setView('home');
    setAarogyaId(null);
    setFormData(null);
  };

  // Fetch beneficiary details from backend
  const fetchBeneficiaryDetails = async (inputId) => {
    try {
      const response = await fetch(`https://jyv33omy2a.execute-api.ap-south-1.amazonaws.com/dev/get_beneficiary_details?aarogya_id=${inputId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        setFormData(JSON.parse(result.body)); // Set fetched data
        setAarogyaId(inputId); // Set the Aarogya ID
        setView('details'); // Navigate to details view
      } else {
        alert('Failed to fetch beneficiary details.');
      }
    } catch (error) {
      alert('Error fetching beneficiary details: ' + error.message);
    }
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
      {/* Render the PromptModal component */}
      <PromptModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={fetchBeneficiaryDetails} 
      />
    </div>
  );
}

export default App;
