import React from 'react';
import _ from 'lodash';

import PerformanceDisplay from '../../components/organisms/PerformanceDisplay';

function DashboardView({ graphqlQuery }) {
  return (
    <PerformanceDisplay graphqlQuery={graphqlQuery} />
  );
}

export default React.memo(DashboardView);
