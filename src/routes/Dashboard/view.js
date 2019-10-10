import React from 'react';
import _ from 'lodash';

import PerformanceDisplay from '../../components/organisms/PerformanceDisplay';

function DashboardView({ history, graphqlQuery }) {
  return (
    <PerformanceDisplay history={history} graphqlQuery={graphqlQuery} />
  );
}

export default React.memo(DashboardView);
