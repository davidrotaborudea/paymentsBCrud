// src/ApolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql', // Cambia por tu URL de GraphQL
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'cors', // no-cors, *cors, same-origin
 }
});

const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloWrapper;
