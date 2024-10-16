// src/AddPaymentStatus.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PAYMENT_STATUS = gql`
  mutation AddPaymentStatus($statusName: String!, $message: String!) {
    addPaymentStatus(statusName: $statusName, message: $message) {
      paymentStatusId
      statusName
      message
    }
  }
`;

const AddPaymentStatus = () => {
  const [formData, setFormData] = useState({
    statusName: '',
    message: '',
  });

  const [addPaymentStatus, { data, loading, error }] = useMutation(ADD_PAYMENT_STATUS);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentStatus({
        variables: {
          statusName: formData.statusName,
          message: formData.message,
        },
      });
      // Resetear el formulario después de una inserción exitosa
      setFormData({
        statusName: '',
        message: '',
      });
    } catch (err) {
      console.error('Error adding payment status:', err);
    }
  };

  return (
    <div>
      <h2>Add Payment Status</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="statusName"
          placeholder="Status Name"
          value={formData.statusName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Payment status added: {data.addPaymentStatus.statusName}</p>}
    </div>
  );
};

export default AddPaymentStatus;
