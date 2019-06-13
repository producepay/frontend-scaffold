import React from 'react';
import { filter } from 'lodash';

import PricingGraphView from './view';

function PricingGraph(props) {
  const { commodityId, varietyId, pricingData } = props;

  return (
    <PricingGraphView
      key={`${commodityId}-${varietyId}`}
      priceReports={filter(pricingData, 'resolvedAveragePrice')}
    />
  );
}

export default React.memo(PricingGraph);
