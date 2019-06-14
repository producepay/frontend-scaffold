import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import _ from 'lodash';

import { nameFromUuids } from '../../../helpers/commodities-and-varieties';
import { gqlF, getUTCDate } from '../../../helpers/dates';
import { getLatestReportsAndDate } from '../../../helpers/reports';

import PricingDetailsView from './view';

const FETCH_DAILY_REPORT_CONTENT = gql`
  query LatestDailyReportContent(
    $commodityId: String!,
    $varietyId: String,
    $startDate: Date,
    $endDate: Date
  ) {
    latestDailyReportContent(
      commodityId: $commodityId,
      varietyId: $varietyId,
      startDate: $startDate,
      endDate: $endDate
    ) {
      commodityId
      varietyId
      pricingMapUrl
    }
  }
`;

function PricingDetails(props) {
  const { commodityId, varietyId, pricingData } = props;

  const commodityVarietyName = nameFromUuids(commodityId, varietyId);
  const [latestReportDate, latestReports] = getLatestReportsAndDate(pricingData);

  const { data } = useQuery(FETCH_DAILY_REPORT_CONTENT, {
    variables: {
      commodityId,
      varietyId,
      startDate: gqlF(getUTCDate(latestReportDate)),
      endDate: gqlF(getUTCDate(latestReportDate)),
    },
    context: { clientName: 'insightsPlatform' },
  });

  return (
    <PricingDetailsView
      commodityVarietyName={commodityVarietyName}
      allReports={pricingData}
      latestReports={latestReports || []}
      latestReportDate={latestReportDate}
      pricingMapUrl={_.get(data, 'latestDailyReportContent.pricingMapUrl', null)}
    />
  );
}

export default React.memo(PricingDetails);
