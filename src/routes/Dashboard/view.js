import React from 'react';

import PerformanceDisplay from '../../components/organisms/PerformanceDisplay';

function DashboardView({ graphqlQuery, graphqlFilters }) {
  return (
    <PerformanceDisplay graphqlQuery={graphqlQuery} graphqlFilters={graphqlFilters} />
  );
}

export default React.memo(DashboardView);
