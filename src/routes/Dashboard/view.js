import React from 'react';

import PerformanceDateFilter from '../../components/molecules/PerformanceDateFilter';
import PerformanceDisplay from '../../components/organisms/PerformanceDisplay';

function DashboardView({ graphqlQuery, graphqlFilters }) {
  return (
    <React.Fragment>
      <div className={`pt-4 px-4 md:pt-6 md:px-6 lg:pt-8 lg:px-8 flex justify-between items-center`}>
        <h3 className='font-medium text-3xl'>Performance</h3>

        <PerformanceDateFilter />
      </div>

      <PerformanceDisplay
        graphqlQuery={graphqlQuery}
        graphqlFilters={graphqlFilters}
      />
    </React.Fragment>
  );
}

export default React.memo(DashboardView);
