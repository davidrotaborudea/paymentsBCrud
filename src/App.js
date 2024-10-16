// src/App.js
import React from 'react';
import ApolloWrapper from './ApolloClient';
import Payments from './Payments';
import AddPayment from './AddPayment';
import AddPaymentMethod from './AddPaymentMethod';
import AddPaymentStatus from './addPaymentStatus';
import AddCard from './AddCard.js';


function App() {
  return (
    <ApolloWrapper>
      <div className="App">
        <h1>GraphQL Payments Test</h1>
        <AddPayment />
        <AddCard />
        <AddPaymentMethod />
        <AddPaymentStatus />
        <Payments />
      </div>
    </ApolloWrapper>
  );
}

export default App;
