import React from 'react';

import PerformanceDisplay from '../../../../components/organisms/PerformanceDisplay';

function ShowCustomerPerformanceView(props) {
  const { graphqlQuery, graphqlFilters } = props;

  return (
    <PerformanceDisplay
      graphqlQuery={graphqlQuery}
      graphqlFilters={graphqlFilters}
    />
  );
}

export default React.memo(ShowCustomerPerformanceView);
