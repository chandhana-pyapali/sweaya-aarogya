import React, { useState } from 'react';
import './DetailsDisplay.css';

function DetailsDisplay({ formData, aarogyaId, onReset }) {
  const [investigationComments, setInvestigationComments] = useState('');
  const [generalComments, setGeneralComments] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateComments = async () => {
    const apiUrl = 'https://jyv33omy2a.execute-api.ap-south-1.amazonaws.com/dev/update_comments'; // Replace with your API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aarogya_id: aarogyaId,
          investigation_comments: investigationComments,
          general_comments: generalComments,
        }),
      });

      if (response.ok) {
        alert('Comments updated successfully!');
      } else {
        alert('Failed to update comments.');
      }
    } catch (error) {
      alert('Error updating comments: ' + error.message);
    }
  };

  return (
    <div className="details-container">
      <h2>BENEFICIARY DETAILS</h2>
      <p><strong>Aarogya ID:</strong> {aarogyaId}</p>
      {formData && (
        <>
          <p><strong>Name :</strong> {formData.name}</p>
          <p><strong>Email :</strong> {formData.email}</p>
          <p><strong>Gender :</strong> {formData.gender}</p>
          <p><strong>Mobile Number :</strong> {formData.mobile_number}</p>
          <p><strong>Aadhaar Number :</strong> {formData.aadhaar_number}</p>
          <p><strong>Place of Investigation :</strong> {formData.place_of_investigation}</p>
          <p><strong>Beneficiary Address :</strong> {formData.door_number}, {formData.street_name}, {formData.mandal_name}, {formData.district_name}, {formData.state_name}</p>
        </>
      )}

      <div className="form-row">
        <label>Investigation Comments:</label>
        <textarea
          value={investigationComments}
          onChange={(e) => setInvestigationComments(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>General Comments:</label>
        <textarea
          value={generalComments}
          onChange={(e) => setGeneralComments(e.target.value)}
        />
      </div>

      {/* <button onClick={handleUpdateComments}>Update Comments</button> */}
      <div class="print-button-container">
        <button onClick={handlePrint}>Print</button>
        <button onClick={onReset}>Back to Home</button>
      </div>
    </div>
  );
}

export default DetailsDisplay;
