import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@nivo/core';

import AppProviders from './contexts/AppProviders';
import Root from './routes/Root';

import apolloClient from './apollo-client';
import nivoTheme from './styles/nivo-theme';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AppProviders>
          <ThemeProvider theme={nivoTheme}>
            <Root />
          </ThemeProvider>
        </AppProviders>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default React.memo(App);
