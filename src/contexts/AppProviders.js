import React from 'react';

import { AuthProvider } from './auth';
import { FilterStateProvider } from './FilterState';

function AppProviders(props) {
  return (
    <AuthProvider>
      <FilterStateProvider>
        {props.children}
      </FilterStateProvider>
    </AuthProvider>
  );
}

export default React.memo(AppProviders);
