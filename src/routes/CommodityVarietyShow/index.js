import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import startOfISOWeek from 'date-fns/start_of_iso_week';
import subWeeks from 'date-fns/sub_weeks';
import endOfWeek from 'date-fns/end_of_week';
import subISOYears from 'date-fns/sub_iso_years';
import addWeeks from 'date-fns/add_weeks';

import { gqlF } from '../../helpers/dates';
import { usePageTracking } from '../../helpers/tracking';

import CommodityVarietyShowView from './view';

const MOVEMENT_GRAPH_WEEKS_BACK = 44;

const FETCH_DATA = gql`
  fragment pricingDataFragment on ShippingPointPriceReport {
    reportDate
    varietySkuName
    cityName
    resolvedLowPriceMin
    resolvedHighPriceMax
    resolvedAveragePrice
  }

  fragment movementGraphFragment on MovementReport {
    reportDate
    year
    week
    commodityUsdaName
    packageWeight
  }

  query loadCommodityVarietyData(
    $commodityUuids: [String!],
    $varietyUuids: [String!],
    $summaryPricingGroups: ShippingPointPriceReportGroupInputs,
    $summaryMovementGroups: MovementReportGroupInputs,
    $summaryPricingFilters: ShippingPointPriceReportFilterInputs,
    $summaryThisYearMovementFilters: MovementReportFilterInputs,
    $summaryLastYearMovementFilters: MovementReportFilterInputs,
    $tableGroups: ShippingPointPriceReportGroupInputs,
    $tableFilters: ShippingPointPriceReportFilterInputs,
    $graphGroups: ShippingPointPriceReportGroupInputs,
    $graphFilters: ShippingPointPriceReportFilterInputs,
    $movementGroups: MovementReportGroupInputs,
    $currentYearMovementFilters: MovementReportFilterInputs,
    $lastYearMovementFilters: MovementReportFilterInputs
  ) {
    summaryPricingData: shippingPointPriceReports(
      group: $summaryPricingGroups
      filter: $summaryPricingFilters
    ) {
      reportDate
      varietySkuName
      resolvedAveragePrice
    }
    summaryThisYearMovementData: movementReports(
      filter: $summaryThisYearMovementFilters
      group: $summaryMovementGroups
    ) {
      reportDate
      packageWeight
    }
    summaryLastYearMovementData: movementReports(
      filter: $summaryLastYearMovementFilters
      group: $summaryMovementGroups
    ) {
      reportDate
      packageWeight
    }

    tablePricingData: shippingPointPriceReports(group: $tableGroups, filter: $tableFilters) {
      ...pricingDataFragment
      gradeUsdaName
      varietyUsdaName
      sizeUsdaName
    }

    graphPricingData: shippingPointPriceReports(group: $graphGroups, filter: $graphFilters) {
      ...pricingDataFragment
      varietyUsdaName
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
      name
      weatherForecasts {
        tempMin
        tempMax
        weatherAlerts(commodityUuids: $commodityUuids) {
          alertType
        }
      }
    }

    mostPopularSkus(commodityUuids: $commodityUuids, varietyUuids: $varietyUuids) {
      varietySkuName
    }
  }
`;

function CommodityVarietyShow(props) {
  const { match: { params: { commodityUuid, varietyUuid } } } = props;
  usePageTracking(props, 'COMMODITY_VARIETY_SHOW');

  const commonMovementFilters = {
    impExpFlag: ['D', 'I'],
    commodityUuid: [commodityUuid],
  };

  const commonPricingGroups = {
    varietySkuName: true,
    cityName: true,
    reportDate: true,
  };

  const startOfWeek = startOfISOWeek(new Date());
  const endOfLastWeek = subDays(startOfWeek, 1);
  const lastYearStartDate = gqlF(subISOYears(subWeeks(startOfWeek, MOVEMENT_GRAPH_WEEKS_BACK), 1));
  const lastYearEndDate = gqlF(subISOYears(endOfWeek(addWeeks(startOfWeek, 8)), 1));
  
  const { loading, error, data } = useQuery(FETCH_DATA, {
    variables: {
      commodityUuids: [commodityUuid],
      varietyUuids: [varietyUuid || '0'],
      summaryPricingFilters: {
        commodityUuid: [commodityUuid],
        varietyUuid: [varietyUuid || '0'],
        dateRanges: [{
          startDate: gqlF(subDays(new Date(), 14)),
          endDate: gqlF(subDays(new Date(), 1)),
        }],
        quality: [''],
      },
      summaryThisYearMovementFilters: {
        ...commonMovementFilters,
        dateRanges: [{
          startDate: gqlF(subDays(startOfWeek, 14)),
          endDate: gqlF(endOfLastWeek),
        }],
      },
      summaryLastYearMovementFilters: {
        ...commonMovementFilters,
        dateRanges: [{
          startDate: gqlF(subISOYears(subDays(startOfWeek, 7), 1)),
          endDate: gqlF(subISOYears(endOfLastWeek, 1)),
        }],
      },
      summaryPricingGroups: { reportDate: true, varietySkuName: true },
      summaryMovementGroups: { interval: 'week' },
      tableGroups: {
        ...commonPricingGroups,
        gradeUsdaName: true,
        varietyUsdaName: true,
        sizeUsdaName: true,
      },
      tableFilters: {
        commodityUuid: [commodityUuid],
        varietyUuid: [varietyUuid || '0'],
        quality: [''],
        dateRanges: [{
          startDate: format(subDays(new Date(), 8), 'YYYY/MM/DD'),
          endDate: format(subDays(new Date(), 1), 'YYYY/MM/DD'),
        }],
      },
      graphGroups: { ...commonPricingGroups, varietyUsdaName: true },
      graphFilters: {
        commodityUuid: [commodityUuid],
        varietyUuid: [varietyUuid || '0'],
        dateRanges: [{
          startDate: format(subDays(new Date(), 29), 'YYYY/MM/DD'),
        }],
        quality: [''],
      },
      movementGroups: {
        commodityUsdaName: true,
        interval: 'week',
        yearOverYear: true,
      },
      currentYearMovementFilters: {
        ...commonMovementFilters,
        dateRanges: [{
          startDate: gqlF(subWeeks(startOfWeek, MOVEMENT_GRAPH_WEEKS_BACK)),
          endDate: gqlF(endOfWeek(subWeeks(new Date(), 1), {weekStartsOn: 1})),
        }],
      },
      lastYearMovementFilters: {
        ...commonMovementFilters,
        dateRanges: [
          { startDate: lastYearStartDate, endDate: lastYearEndDate },
        ],
      },
    },
  })

  return (
    <CommodityVarietyShowView
      commodityUuid={commodityUuid}
      varietyUuid={varietyUuid}
      loading={loading}
      error={error}
      data={data}
    />
  );
}

export default React.memo(CommodityVarietyShow);
