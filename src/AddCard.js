import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_CARD = gql`
  mutation AddCard(
    $cardNumber: String!
    $cardCvc: String!
    $cardType: String!
    $cardHolderId: String!
    $cardHolderName: String!
    $expiryDate: String!
  ) {
    addCard(
      cardNumber: $cardNumber
      cardCvc: $cardCvc
      cardType: $cardType
      cardHolderId: $cardHolderId
      cardHolderName: $cardHolderName
      expiryDate: $expiryDate
    ) {
      cardId
      cardHolderName
    }
  }
`;

const AddCard = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardCvc: '',
    cardType: '',
    cardHolderId: '',
    cardHolderName: '',
    expiryDate: '',
  });

  const [addCard, { data, loading, error }] = useMutation(ADD_CARD);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCard({
        variables: {
          cardNumber: formData.cardNumber,
          cardCvc: formData.cardCvc,
          cardType: formData.cardType,
          cardHolderId: formData.cardHolderId,
          cardHolderName: formData.cardHolderName,
          expiryDate: formData.expiryDate,
        },
      });
      setFormData({
        cardNumber: '',
        cardCvc: '',
        cardType: '',
        cardHolderId: '',
        cardHolderName: '',
        expiryDate: '',
      });
    } catch (err) {
      console.error('Error adding card:', err);
    }
  };

  return (
    <div>
      <h2>Add Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardCvc"
          placeholder="Card CVC"
          value={formData.cardCvc}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardType"
          placeholder="Card Type"
          value={formData.cardType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardHolderId"
          placeholder="Card Holder ID"
          value={formData.cardHolderId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardHolderName"
          placeholder="Card Holder Name"
          value={formData.cardHolderName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Card added for holder: {data.addCard.cardHolderName}</p>}
    </div>
  );
};

export default AddCard;
