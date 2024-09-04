import React, { useState } from 'react';
import './UserForm.css'; // Add this line to import the CSS for styling
import Barcode from 'react-barcode'; // npm install react-barcode

function UserForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    guardian_name: '',
    age: '',
    mobile_number: '',
    aadhaar_number: '',
    door_number: '',
    street_name: '',
    mandal_name: '',
    district_name: '',
    state_name: ''
  });

  // State for success and error messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [barcode, setBarcode] = useState(''); // State to store the barcode

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with your API Gateway endpoint
    const apiUrl = 'https://jyv33omy2a.execute-api.ap-south-1.amazonaws.com/dev/save_beneficiary_details';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // formData from React state
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setErrorMessage('');
        setBarcode(result.aarogya_id); // Assuming aarogya_id is returned and used as barcode value
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to save user details.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error submitting form: ' + error.message);
      setSuccessMessage('');
    }
  };

  // Function to print the details and barcode
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-placeholder"></div> 
        <h1>Sweaya Aarogya</h1>
      </header>

      <form onSubmit={handleSubmit} className="user-form">
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Form Fields */}
        <div className="form-row">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-row">
        <label>Guardian Name:</label>
        <input
          type="text"
          name="guardian_name"
          value={formData.guardian_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Aadhaar Number:</label>
        <input
          type="text"
          name="aadhaar_number"
          value={formData.aadhaar_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Door Number:</label>
        <input
          type="text"
          name="door_number"
          value={formData.door_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Street Name:</label>
        <input
          type="text"
          name="street_name"
          value={formData.street_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>Mandal Name:</label>
        <input
          type="text"
          name="mandal_name"
          value={formData.mandal_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>District Name:</label>
        <input
          type="text"
          name="district_name"
          value={formData.district_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <label>State Name:</label>
        <input
          type="text"
          name="state_name"
          value={formData.state_name}
          onChange={handleChange}
          required
        />
      </div>
      {/* <button type="submit">Save</button> */}
      <div className="button-container">
        <button type="submit">Save</button>
        <button className="print-button" onClick={handlePrint}>Print Details</button>
      </div>
      </form>

      {/* Barcode Section */}
      {barcode && (
        <div className="barcode-section">
          <h3>Generated Barcode</h3>
          <Barcode value={barcode} />
        </div>
      )}

      {/* Print Button */}
      {/* <button className="print-button" onClick={handlePrint}>Print Details</button> */}
    </div>
  );
}

export default UserForm;
