import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import subDays from 'date-fns/sub_days';
import startOfISOWeek from 'date-fns/start_of_iso_week';
import subISOYears from 'date-fns/sub_iso_years';

import { gqlF } from '../../../../helpers/dates';

import { allCommoditiesAndVarieties } from '../../../../helpers/commodities-and-varieties';

import MarketInsightsAllView from './view';

const FETCH_DATA = gql`
  query CommodityQuery(
    $commodityUuids: [String!],
    $summaryPricingFilters:ShippingPointPriceReportFilterInputs,
    $summaryPricingGroups:ShippingPointPriceReportGroupInputs
    $summaryMovementGroups: MovementReportGroupInputs,
    $summaryThisYearMovementFilters: MovementReportFilterInputs,
    $summaryLastYearMovementFilters: MovementReportFilterInputs,
  ) {
    userCommodityVarietyPreferences {
      commodityVarietyInfo {
        id
        commodity {
          id
          uuid
        }
        commodityName
        variety {
          id
          uuid
        }
      }
    }
    summaryPricingData: shippingPointPriceReports(
      group:$summaryPricingGroups
      filter:$summaryPricingFilters
    ) {
      commodityUsdaName
      commodityUuid
      commodityId
      varietyUuid
      varietyId
      varietyUsdaName
      reportDate
      varietySkuName
      resolvedAveragePrice
    }
    summaryThisYearMovementData: movementReports(
      filter: $summaryThisYearMovementFilters
      group: $summaryMovementGroups
    ) {
      commodityUuid
      reportDate
      packageWeight
    }
    summaryLastYearMovementData: movementReports(
      filter: $summaryLastYearMovementFilters
      group: $summaryMovementGroups
    ) {
      commodityUuid
      reportDate
      packageWeight
    }

    growingRegions(commodityUuids: $commodityUuids, inSeason: true) {
      id
      name
      weatherForecasts {
        tempMin
        tempMax
        weatherAlerts(commodityUuids: $commodityUuids) {
          commodityId
          alertType
        }
      }
      commodities {
        id
        uuid
      }
    }
  }
`

const commodityUuids = _.uniq(_.map(allCommoditiesAndVarieties, 'commodityUuid'), (commodityAndVariety) => {
  return [
    commodityAndVariety.commodityUuid
  ]
})

const varietyUuids = _.uniq(_.map(allCommoditiesAndVarieties, 'varietyUuid'), (commodityAndVariety) => {
  return [
    commodityAndVariety.varietyUuid
  ]
})

const commonMovementFilters = {
  impExpFlag: ['D', 'I'],
  commodityUuid: commodityUuids
};

const startOfWeek = startOfISOWeek(new Date());
const endOfLastWeek = subDays(startOfWeek, 1);

function MarketInsightsAll(props) {
  const { loading, error, data } = useQuery(FETCH_DATA, {
    variables: {
      commodityUuids: commodityUuids,
      summaryPricingFilters: {
        commodityUuid: commodityUuids,
        varietyUuid: [...varietyUuids, '0'],
        dateRanges: [{
          startDate: gqlF(subDays(new Date(), 14)),
          endDate: gqlF(subDays(new Date(), 1)),
        }],
        quality: [''],
      },
      summaryPricingGroups: {
        reportDate: true, 
        varietySkuName: true,
        commodityUsdaName: true,
        commodityUuid: true,
        commodityId: true,
        varietyUuid: true,
        varietyId: true,
        varietyUsdaName: true
      },
      summaryThisYearMovementFilters: {
        ...commonMovementFilters,
        isCurrentSeason: true,
        dateRanges: [{
          startDate: gqlF(subDays(startOfWeek, 14)),
          endDate: gqlF(endOfLastWeek),
        }],
      },
      summaryLastYearMovementFilters: {
        ...commonMovementFilters,
        isLastSeason: true,
        dateRanges: [{
          startDate: gqlF(subISOYears(subDays(startOfWeek, 7), 1)),
          endDate: gqlF(subISOYears(endOfLastWeek, 1)),
        }],
      },
      summaryMovementGroups: {
        interval: 'week',
        commodityUuid: true
      },
    }
  })

  return (
    <MarketInsightsAllView
      loading={loading}
      error={error}
      data={data}
    />
  )
}

export default React.memo(MarketInsightsAll);
