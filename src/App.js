import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import AppProviders from './contexts/AppProviders';

import Root from './routes/Root';

import apolloClient from './apollo-client';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AppProviders>
          <Root />
        </AppProviders>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default React.memo(App);
