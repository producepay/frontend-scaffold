import React from 'react';

import { AuthProvider } from './auth';

function AppProviders(props) {
  return (
    <AuthProvider>
      {props.children}
    </AuthProvider>
  );
}

export default React.memo(AppProviders);
