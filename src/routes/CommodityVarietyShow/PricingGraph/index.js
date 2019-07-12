import React from 'react';
import { filter } from 'lodash';

import { commodityNameFromUuid } from '../../../helpers/commodities-and-varieties';

import PricingGraphView from './view';

function PricingGraph(props) {
  const { commodityId, varietyId, pricingData, mostPopularSku } = props;

  const commodityName = commodityNameFromUuid(commodityId, varietyId);

  return (
    <PricingGraphView
      key={`${commodityId}-${varietyId}`}
      commodityName={commodityName}
      priceReports={filter(pricingData, 'resolvedAveragePrice')}
      mostPopularSku={mostPopularSku}
    />
  );
}

export default React.memo(PricingGraph);
