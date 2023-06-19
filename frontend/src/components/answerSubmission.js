import React, { useState } from 'react';

const AnswerSubmit = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send form data to the Flask backend
    fetch('http://localhost:5000/submit', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response from the Flask backend
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Answer:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AnswerSubmit;
