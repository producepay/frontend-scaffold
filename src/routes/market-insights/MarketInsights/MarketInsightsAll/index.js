import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import subWeeks from 'date-fns/sub_weeks';
import addWeeks from 'date-fns/add_weeks';
import endOfWeek from 'date-fns/end_of_week';
import startOfISOWeek from 'date-fns/start_of_iso_week';
import subISOYears from 'date-fns/sub_iso_years';

import { gqlF } from '../../../../helpers/dates';

import { allCommoditiesAndVarieties } from '../../../../helpers/commodities-and-varieties';

import MarketInsightsAllView from './view';

const MOVEMENT_GRAPH_WEEKS_BACK = 44;

const FETCH_DATA = gql`
  query CommodityQuery(
    $commodityUuids: [String!],
    $summaryPricingFilters:ShippingPointPriceReportFilterInputs,
    $summaryPricingGroups:ShippingPointPriceReportGroupInputs
    $summaryMovementGroups: MovementReportGroupInputs,
    $summaryThisYearMovementFilters: MovementReportFilterInputs,
    $summaryLastYearMovementFilters: MovementReportFilterInputs,
    $movementGroups: MovementReportGroupInputs,
    $currentYearMovementFilters: MovementReportFilterInputs,
    $lastYearMovementFilters: MovementReportFilterInputs,
  ) {
    commodities(
    hasShippingPointPriceReports: true
    ) {
        name
        id
    }
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
    currentYearMovementReports: movementReports(
      filter: $currentYearMovementFilters
      group: $movementGroups
    ) {
      ...movementGraphFragment
    }
    lastYearMovementReports: movementReports(
      filter: $lastYearMovementFilters
      group: $movementGroups
    ) {
      ...movementGraphFragment
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

  fragment movementGraphFragment on MovementReport {
    reportDate
    year
    week
    commodityUsdaName
    packageWeight
  }
`

const commodityUuids = _.flatten(_.map(_.uniqBy(allCommoditiesAndVarieties, 'commodityUuid'), (commodityAndVariety) => {
  return [
    commodityAndVariety.commodityUuid
  ]
}))

const varietyUuids = _.flatten(_.map(_.uniqBy(allCommoditiesAndVarieties, 'varietyUuid'), (commodityAndVariety) => {
  return [
    commodityAndVariety.varietyUuid
  ]
}))

const commonMovementFilters = {
  impExpFlag: ['D', 'I'],
  commodityUuid: commodityUuids
};

const startOfWeek = startOfISOWeek(new Date());
const endOfLastWeek = subDays(startOfWeek, 1);
const lastYearStartDate = gqlF(subISOYears(subWeeks(startOfWeek, MOVEMENT_GRAPH_WEEKS_BACK), 1));
const lastYearEndDate = gqlF(subISOYears(endOfWeek(addWeeks(startOfWeek, 8)), 1));

function MarketInsightsAll(props) {
  const { loading, error, data } = useQuery(FETCH_DATA, {
    variables: {
      commodityUuids: commodityUuids,
      summaryPricingFilters: {
        commodityUuid: commodityUuids,
        varietyUuid: varietyUuids || '0',
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
      movementGroups: {
        commodityUsdaName: true,
        interval: 'week',
        yearOverYear: true,
      },
      summaryMovementGroups: { 
        interval: 'week',
        commodityUuid: true
      },
      currentYearMovementFilters: {
        ...commonMovementFilters,
        isCurrentSeason: true,
        dateRanges: [{
          startDate: gqlF(subWeeks(startOfWeek, MOVEMENT_GRAPH_WEEKS_BACK)),
          endDate: gqlF(endOfWeek(subWeeks(new Date(), 1), {weekStartsOn: 1})),
        }],
      },
      lastYearMovementFilters: {
        ...commonMovementFilters,
        isLastSeason: true,
        dateRanges: [
          { startDate: lastYearStartDate, endDate: lastYearEndDate },
        ],
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
