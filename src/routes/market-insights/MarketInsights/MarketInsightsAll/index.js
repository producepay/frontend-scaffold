import React from 'react';
import gql from 'graphql-tag';
import { useAuth } from '../../../../contexts/auth';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import subWeeks from 'date-fns/sub_weeks';
import addWeeks from 'date-fns/add_weeks';
import endOfWeek from 'date-fns/end_of_week';
import startOfISOWeek from 'date-fns/start_of_iso_week';
import subISOYears from 'date-fns/sub_iso_years';

import { getUTCDate } from '../../../../helpers/dates';
import { orderByDateStr } from '../../../../helpers/lodash';
import { getPercentage } from '../../../../helpers/math';
import { gqlF } from '../../../../helpers/dates';

import { allCommoditiesAndVarieties } from '../../../../helpers/commodities-and-varieties';

import MarketInsightsAllView from './view';

const MOVEMENT_GRAPH_WEEKS_BACK = 44;

const FETCH_DATA = gql`
  query CommodityQuery(
    $userId: Int!,
    $commodityUuids: [String!],
    $hasSppr: Boolean,
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
    hasShippingPointPriceReports: $hasSppr
    ) {
      ...commodityFields
    }
    userCommodityVarietyPreferences(userId:$userId) {
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


  fragment commodityFields on Commodity {
    name
    id
  }

  fragment movementGraphFragment on MovementReport {
    reportDate
    year
    week
    commodityUsdaName
    packageWeight
  }
`


const uniqueCommodities = _.flatten(_.values(_.groupBy(allCommoditiesAndVarieties, 'commodityUuid'), function(commodityAndVariety) {
  return [
    commodityAndVariety.commodityUuid + "-" + commodityAndVariety.commodityUuid
  ]
}))

const uniqueCommodityUuids = _.uniqBy(uniqueCommodities, 'commodityUuid')
const commodityUuids = _.map(uniqueCommodityUuids, 'commodityUuid')

const varietyUuids = _.flatten(_.map(_.uniqBy(allCommoditiesAndVarieties, 'varietyUuid'), function(commodityAndVariety) {
  return [
    commodityAndVariety.varietyUuid
  ]
}))

const commonMovementFilters = {
  impExpFlag: ['D', 'I'],
  commodityUuid: commodityUuids
};

const formatDateToString = date => format(date, 'YYYY-MM-DDT00:00:00[Z]');

const startOfWeek = startOfISOWeek(new Date());
const endOfLastWeek = subDays(startOfWeek, 1);
const lastYearStartDate = gqlF(subISOYears(subWeeks(startOfWeek, MOVEMENT_GRAPH_WEEKS_BACK), 1));
const lastYearEndDate = gqlF(subISOYears(endOfWeek(addWeeks(startOfWeek, 8)), 1));

const getPriceAveragesForSku = (reportsForSku, latestDate, dayBeforeDate, weekBeforeDate) => {
  const { resolvedAveragePrice: mostRecentPrice } = _.find(reportsForSku, { reportDate: latestDate }) || {};
  const { resolvedAveragePrice: dayBeforePrice } = _.find(reportsForSku, { reportDate: dayBeforeDate }) || {};
  const { resolvedAveragePrice: weekBeforePrice } = _.find(reportsForSku, { reportDate: weekBeforeDate }) || {};

  return {
    dayOverDay: getPercentage(mostRecentPrice, dayBeforePrice),
    weekOverWeek: getPercentage(mostRecentPrice, weekBeforePrice),
  };
};

export function getPricingPercentagesAndDayBefore(priceReports) {
  const orderedReportDates = _.uniq(_.map(orderByDateStr(priceReports, 'reportDate'), 'reportDate'));

  const latestDate = orderedReportDates[0];
  const dayBeforeDate = orderedReportDates[1];
  const weekBefore = subWeeks(getUTCDate(latestDate), 1);
  const weekBeforeDate = weekBefore ? formatDateToString(weekBefore) : null;

  const skuKeyedReports = _.groupBy(priceReports, 'varietySkuName');
  const skuKeyedAverages = _.map(
    skuKeyedReports,
    (skuReports) => getPriceAveragesForSku(skuReports, latestDate, dayBeforeDate, weekBeforeDate),
  );

  const dayOverDayVals = _.reject(_.map(skuKeyedAverages, 'dayOverDay'), _.isNull);
  const weekOverWeekVals = _.reject(_.map(skuKeyedAverages, 'weekOverWeek'), _.isNull);

  return {
    pricingPercentages: [
      _.isEmpty(dayOverDayVals) ? '--' : _.round(_.mean(dayOverDayVals)),
      _.isEmpty(weekOverWeekVals) ? '--' : _.round(_.mean(weekOverWeekVals)),
    ],
    dayBefore: getUTCDate(dayBeforeDate),
  };
};

function MarketInsightsAll(props) {
  let { user } = useAuth()
  const { loading, error, data } = useQuery(FETCH_DATA, {
    variables: {
      userId: Number(user.id),
      commodityUuids: commodityUuids,
      hasSppr: true,
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
        varietyUuid: true
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
