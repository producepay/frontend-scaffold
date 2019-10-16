import React from 'react';

import { useFilters } from '../../../contexts/filters';
import SidebarView from './view';

function SidebarFilters(props) {
  const { loading, filters } = useFilters();
  return (
    <SidebarView loading={loading} filters={filters} />
  );
}

export default React.memo(SidebarFilters);
