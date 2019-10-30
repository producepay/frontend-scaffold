import React from 'react';

import PerformanceDisplay from '../../../../components/organisms/PerformanceDisplay';

function ShowCommodityPerformanceView(props) {
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

export default React.memo(ShowCommodityPerformanceView);
