import React from 'react';

import PerformanceDisplay from '../../../../components/organisms/PerformanceDisplay';

function ShowCustomerPerformanceView(props) {
  const { graphqlQuery, graphqlFilters } = props;

  return (
    <div>
      <PerformanceDisplay
        graphqlQuery={graphqlQuery}
        graphqlFilters={graphqlFilters}
      />
    </div>
  );
}

export default React.memo(ShowCustomerPerformanceView);
