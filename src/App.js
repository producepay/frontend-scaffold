import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';

import Root from './routes/Root';

import apolloClient from './apollo-client';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default React.memo(App);
