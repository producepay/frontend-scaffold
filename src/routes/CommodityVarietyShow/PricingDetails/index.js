import React from 'react';
import _ from 'lodash';

import { nameFromUuids } from '../../../helpers/commodities-and-varieties';
import { getLatestReportsAndDate } from '../../../helpers/reports';

import PricingDetailsView from './view';

function PricingDetails(props) {
  const { commodityId, varietyId, pricingData } = props;

  const commodityVarietyName = nameFromUuids(commodityId, varietyId);
  const [latestReportDate, latestReports] = getLatestReportsAndDate(_.filter(pricingData, 'resolvedAveragePrice'));

  return (
    <PricingDetailsView
      commodityVarietyName={commodityVarietyName}
      latestReports={latestReports || []}
      latestReportDate={latestReportDate}
    />
  );
}

export default React.memo(PricingDetails);
