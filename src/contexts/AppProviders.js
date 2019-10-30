import React from 'react';

import { AuthProvider } from './auth';
import { FilterStateProvider } from './FilterState';

function AppProviders(props) {
  return (
    <FilterStateProvider>
      <AuthProvider>
        {props.children}
      </AuthProvider>
    </FilterStateProvider>
  );
}

export default React.memo(AppProviders);
