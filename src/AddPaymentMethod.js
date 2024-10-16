// src/AddPaymentMethod.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PAYMENT_METHOD = gql`
  mutation AddPaymentMethod(
    $methodName: String!
    $urlImage: String!
    $active: Boolean!
    $referenceCode: String!
  ) {
    addPaymentMethod(
      methodName: $methodName
      urlImage: $urlImage
      active: $active
      referenceCode: $referenceCode
    ) {
      paymentMethodId
      methodName
      urlImage
    }
  }
`;

const AddPaymentMethod = () => {
  const [formData, setFormData] = useState({
    methodName: '',
    urlImage: '',
    active: false,
    referenceCode: '',
  });

  const [addPaymentMethod, { data, loading, error }] = useMutation(ADD_PAYMENT_METHOD);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentMethod({
        variables: {
          methodName: formData.methodName,
          urlImage: formData.urlImage,
          active: formData.active,
          referenceCode: formData.referenceCode,
        },
      });
      // Resetear el formulario después de una inserción exitosa
      setFormData({
        methodName: '',
        urlImage: '',
        active: false,
        referenceCode: '',
      });
    } catch (err) {
      console.error('Error adding payment method:', err);
    }
  };

  return (
    <div>
      <h2>Add Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="methodName"
          placeholder="Method Name"
          value={formData.methodName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="urlImage"
          placeholder="URL Image"
          value={formData.urlImage}
          onChange={handleChange}
          required
        />
        <label>
          Active:
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </label>
        <input
          type="text"
          name="referenceCode"
          placeholder="Reference Code"
          value={formData.referenceCode}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Payment method added: {data.addPaymentMethod.methodName}</p>}
    </div>
  );
};

export default AddPaymentMethod;
