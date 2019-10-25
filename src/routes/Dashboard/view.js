import React from 'react';

import PerformanceDateFilter from '../../components/molecules/PerformanceDateFilter';
import PerformanceDisplay from '../../components/organisms/PerformanceDisplay';
import { BOTTOMLESS_SECTION_SPACING } from '../../components/organisms/PerformanceDisplay/view';

function DashboardView(props) {
  const { graphqlQuery, graphqlFilters } = props;

  return (
    <React.Fragment>
      <div className={`${BOTTOMLESS_SECTION_SPACING} flex justify-between items-center`}>
        <h3 className='font-medium text-4xl'>Performance</h3>

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
