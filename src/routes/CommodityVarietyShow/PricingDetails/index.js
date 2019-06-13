import React from 'react';

import { nameFromUuids } from '../../../helpers/commodities-and-varieties';
import { getLatestReportsAndDate } from '../../../helpers/reports';

import PricingDetailsView from './view';

function PricingDetails(props) {
  const { commodityId, varietyId, pricingData, pricingMapUrl } = props;

  const commodityVarietyName = nameFromUuids(commodityId, varietyId);
  const [latestReportDate, latestReports] = getLatestReportsAndDate(pricingData);

  return (
    <PricingDetailsView
      commodityVarietyName={commodityVarietyName}
      allReports={pricingData}
      latestReports={latestReports || []}
      latestReportDate={latestReportDate}
      pricingMapUrl={pricingMapUrl}
    />
  );
}

export default React.memo(PricingDetails);
