// src/Payments.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Payments.css'; // Asegúrate de importar tu archivo de estilos

const GET_ALL_PAYMENTS = gql`
  query GetAllPayments {
    allPayments {
      paymentId
      flightId
      card {
        cardId
        cardNumber
        cardCvc
        cardType
        cardHolderId
        cardHolderName
        expiryDate
      }
      paymentMethod {
        methodName
        urlImage
        active
        referenceCode
      }
      paymentStatus {
        statusName
        message
      }
      paymentReference
      amount
    }
  }
`;

const Payments = () => {
  const { loading, error, data } = useQuery(GET_ALL_PAYMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Payments</h2>
      <table className="payments-table">
        <thead>
          <tr>
            <th>Payment Reference</th>
            <th>Amount</th>
            <th>Card Holder Name</th>
            <th>Card Type</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data.allPayments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentReference}</td>
              <td>{payment.amount}</td>
              <td>{payment.card.cardHolderName}</td>
              <td>{payment.card.cardType}</td>
              <td>{payment.paymentMethod.methodName}</td>
              <td>{payment.paymentStatus.statusName}</td>
              <td>{payment.paymentStatus.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
