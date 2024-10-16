// src/AddPayment.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PAYMENT = gql`
  mutation AddPayment(
    $flightId: String!
    $cardId: String!
    $paymentMethodId: String!
    $paymentStatusId: String!
    $paymentReference: String!
    $amount: Float!
  ) {
    addPayment(
      flightId: $flightId
      cardId: $cardId
      paymentMethodId: $paymentMethodId
      paymentStatusId: $paymentStatusId
      paymentReference: $paymentReference
      amount: $amount
    ) {
      paymentId
      paymentReference
    }
  }
`;

const AddPayment = () => {
  const [formData, setFormData] = useState({
    flightId: '',
    cardId: '',
    paymentMethodId: '',
    paymentStatusId: '',
    paymentReference: '',
    amount: 0,
  });

  const [addPayment, { data, loading, error }] = useMutation(ADD_PAYMENT);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPayment({
      variables: {
        flightId: formData.flightId,
        cardId: formData.cardId,
        paymentMethodId: formData.paymentMethodId,
        paymentStatusId: formData.paymentStatusId,
        paymentReference: formData.paymentReference,
        amount: parseFloat(formData.amount),
      },
    });
  };

  return (
    <div>
      <h2>Add Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="flightId"
          placeholder="Flight ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardId"
          placeholder="Card ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="paymentMethodId"
          placeholder="Payment Method ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="paymentStatusId"
          placeholder="Payment Status ID"
          onChange={handleChange}
        />
        <input
          type="text"
          name="paymentReference"
          placeholder="Payment Reference"
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Payment added with reference {data.addPayment.paymentReference}</p>}
    </div>
  );
};

export default AddPayment;
